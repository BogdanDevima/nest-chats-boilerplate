import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import envConfig from './config/env.config';
import configureSwagger from './config/swagger.config';
import { initializeTransactionalContext } from './features/common/transaction.util';
import { initializeFirebaseAdmin } from './features/firebase/firebase.util';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  // Get the environment configuration.
  const { port, enableSwagger, frontendHostUrl, google } = envConfig();

  // Initialize Firebase Admin
  await initializeFirebaseAdmin(google.applicationCredentials);

  app.enableCors({ origin: frontendHostUrl });

  if (enableSwagger) {
    configureSwagger(app);
  }

  await app.listen(port);
}
bootstrap();
