import { Injectable, NotImplementedException } from '@nestjs/common';

import { EmailTemplate } from './enums';
import { EmailParams } from './interfaces';
import { MailingService } from './mailing.service';

@Injectable()
export class MailChimpService extends MailingService {
  sendEmail = async (
    _recipient: string,
    _templateId: EmailTemplate,
    _params: EmailParams<EmailTemplate>,
  ) => {
    // TODO: implement MailChimp or other mailing service API
    throw new NotImplementedException('MailChimpService is not implemented yet');
  };
}
