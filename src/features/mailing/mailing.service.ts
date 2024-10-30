import { Injectable } from '@nestjs/common';

import { EmailTemplate } from './enums';
import { IResetPasswordEmailParams } from './interfaces';

@Injectable()
export abstract class MailingService {
  abstract sendEmail(
    recipient: string,
    templateId: EmailTemplate,
    params: IResetPasswordEmailParams,
  ): Promise<void>;

  static getTemplateTitle: Record<EmailTemplate, string> = {
    [EmailTemplate.ForgotPassword]: 'Reset password',
  };
}
