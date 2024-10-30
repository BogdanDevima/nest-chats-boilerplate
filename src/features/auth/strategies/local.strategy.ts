import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { User } from 'src/features/users';

import { AuthService } from '../auth.service';

// This strategy is responsible for logging in user with email and password
@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email.toLowerCase(), password);
    if (!user) {
      // TODO: create error messages constants file
      throw new UnauthorizedException(
        'We couldn’t find an account matching the username and password you entered. Please check your username and password and try again.',
      );
    }
    return user;
  }
}
