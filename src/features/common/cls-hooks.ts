import { EventEmitter } from 'events';

import { getNamespace, Namespace } from 'cls-hooked';

import { getHookInContext, NAMESPACE_NAME, setHookInContext } from './transaction.util';

export const createEmitterInNewContext = (context: Namespace) =>
  context.runAndReturn(() => {
    const emitter = new EventEmitter();
    context.bindEmitter(emitter);
    return emitter;
  });

export const runAndTriggerHooks = async (hook: EventEmitter, cb: () => any) => {
  try {
    const res = await cb();
    setImmediate(() => {
      hook.emit('commit');
      hook.emit('end', undefined);
      hook.removeAllListeners();
    });
    return res;
  } catch (err) {
    setImmediate(() => {
      hook.emit('rollback', err);
      hook.emit('end', err);
      hook.removeAllListeners();
    });
    throw err;
  }
};

export const runInNewHookContext = async (context: Namespace, cb: () => any) => {
  const hook = createEmitterInNewContext(context);
  return await context.runAndReturn(() => {
    setHookInContext(context, hook);
    return runAndTriggerHooks(hook, cb);
  });
};

export const getTransactionalContextHook = () => {
  const ctx = getNamespace(NAMESPACE_NAME);
  const emitter = getHookInContext(ctx);
  if (!emitter) {
    throw new Error('No hook manager found in context. Are you using useTransaction()?');
  }
  return emitter;
};

export const runOnTransactionCommit = (cb: () => void) => {
  getTransactionalContextHook().once('commit', cb);
};

export const runOnTransactionRollback = (cb: (e: Error) => void) => {
  getTransactionalContextHook().once('rollback', cb);
};

export const runOnTransactionComplete = (cb: (e: Error | undefined) => void) => {
  getTransactionalContextHook().once('end', cb);
};
