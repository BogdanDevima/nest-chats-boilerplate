import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

import { UsersService } from '../users/users.service';

@Injectable()
export class FirebaseService {
  constructor(private usersService: UsersService) {}

  /**
   * Create a custom JWT token for the user.
   *
   * @param {string} userId - The user ID.
   * @return {string} The custom JWT token.
   */
  public async getCustomToken(userId: string) {
    const user = await this.usersService.findOne(userId);
    try {
      return await getAuth().createCustomToken(user.id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create custom token');
    }
  }
}
