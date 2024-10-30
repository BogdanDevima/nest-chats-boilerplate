import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import envConfig from 'src/config/env.config';

import { MailChimpService } from './mail-chimp.service';
import { MailhogService } from './mailhog.service';
import { MailingService } from './mailing.service';

@Module({
  providers: [
    {
      provide: MailingService,
      useFactory: (config: ConfigType<typeof envConfig>) => {
        return config.mailhog.host && config.mailhog.port
          ? new MailhogService(config)
          : new MailChimpService();
      },
      inject: [{ token: envConfig.KEY, optional: false }],
    },
  ],
  exports: [MailingService],
})
export class MailingModule {}
