import { createNamespace, getNamespace, Namespace } from 'cls-hooked';
import { EntityManager, ObjectLiteral, Repository } from 'typeorm';

import type { EventEmitter } from 'events';

export const NAMESPACE_NAME = '__typeOrm___cls_hooked_tx_namespace';

const TYPE_ORM_ENTITY_MANAGER_KEY = '__typeOrm__transactionalEntityManager';
const TYPE_ORM_HOOK_KEY = '__typeOrm__transactionalCommitHooks';

/**
 * Create or return cls namespace where transactional entity manager is stored.
 * This method should be called before TypeORM module is initialized.
 */
export const initializeTransactionalContext = () => {
  return getNamespace(NAMESPACE_NAME) || createNamespace(NAMESPACE_NAME);
};

export const setEntityManager = (context: Namespace, entityManager: EntityManager | null) =>
  context.set(`${TYPE_ORM_ENTITY_MANAGER_KEY}`, entityManager);

export const getHookInContext = (context: Namespace | undefined): EventEmitter | null => {
  return context?.get(TYPE_ORM_HOOK_KEY);
};

export const setHookInContext = (context: Namespace, emitter: EventEmitter | null) => {
  return context.set(TYPE_ORM_HOOK_KEY, emitter);
};

export const getEntityManager = (context: Namespace): EntityManager => {
  return context.get(`${TYPE_ORM_ENTITY_MANAGER_KEY}`);
};

export const getEntityManagerOrTransactionManager = (
  entityManager: EntityManager,
): EntityManager => {
  const context = getNamespace(NAMESPACE_NAME);

  if (context && context.active) {
    // return entityManager from transaction context if this context exist
    // otherwise return default entity manager
    return getEntityManager(context) || entityManager;
  }
  return entityManager;
};

/**
 * @param repositoryType repository class where the `manager` property will be patched
 * to support cls-hooked namespaces
 */
export const patchRepositoryManager = <TEntity extends ObjectLiteral>(
  repositoryType: Repository<TEntity>,
) => {
  Object.defineProperty(repositoryType, 'manager', {
    get() {
      return getEntityManagerOrTransactionManager(this._manager);
    },
    set(manager: EntityManager | undefined) {
      this._manager = manager;
    },
  });
};
