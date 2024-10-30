import { UserRole, UserStatus } from 'src/features/auth';

export class CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
  status?: UserStatus;
}
