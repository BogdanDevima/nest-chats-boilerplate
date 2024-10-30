import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import envConfig from 'src/config/env.config';

import { UsersModule } from '../users';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshService } from './jwt-refresh.service';
import { JwtStrategy, LocalStrategy } from './strategies';

export const JwtAsyncModule = JwtModule.registerAsync({
  useFactory: (config: ConfigType<typeof envConfig>) => {
    return {
      secret: config.auth.jwtSecret,
      signOptions: { expiresIn: config.auth.authTokenDuration },
    };
  },
  inject: [{ token: envConfig.KEY, optional: false }],
});

@Module({
  imports: [UsersModule, PassportModule, JwtAsyncModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshService],
  exports: [AuthService],
})
export class AuthModule {}
