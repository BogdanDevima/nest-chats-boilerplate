import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import envConfig from 'src/config/env.config';

import { EmailTemplate } from './enums';
import { EmailParams } from './interfaces';
import { MailingService } from './mailing.service';

@Injectable()
export class MailhogService extends MailingService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
  ) {
    super();

    this.transporter = createTransport({
      host: this.config.mailhog.host,
      port: this.config.mailhog.port,
    });
  }

  async sendEmail(
    recipient: string,
    templateId: EmailTemplate,
    params: EmailParams<EmailTemplate>,
  ) {
    await this.transporter.sendMail({
      from: `${this.config.appName} <no-reply@example.org>`,
      to: recipient,
      subject: `${MailhogService.getTemplateTitle[templateId]} - ${this.config.appName}`,
      text: JSON.stringify(params, null, 2),
    });
  }
}
