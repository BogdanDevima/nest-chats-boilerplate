import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Authorized } from '../auth';
import { IRequestWithUser } from '../auth/interfaces';

import { FirebaseService } from './firebase.service';

@ApiTags('Firebase Admin')
@Controller('firebase')
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @ApiOperation({ description: 'Get firebase authorization token' })
  @Authorized()
  @Get('custom-token')
  getCustomToken(@Req() req: IRequestWithUser) {
    return this.firebaseService.getCustomToken(req.user.id);
  }
}
