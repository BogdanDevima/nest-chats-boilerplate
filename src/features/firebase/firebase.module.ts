import { Module } from '@nestjs/common';

import { UsersModule } from '../users';

import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [UsersModule],
  providers: [FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
