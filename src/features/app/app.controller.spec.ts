import { Test, TestingModule } from '@nestjs/testing';

import envConfig from 'src/config/env.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: envConfig.KEY,
          useValue: { appName: null },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be healthy', () => {
      const { isHealthy } = appController.getHealthCheck();
      expect(isHealthy).toBeTruthy();
    });
  });
});
