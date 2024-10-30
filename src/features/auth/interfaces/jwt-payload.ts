import { UserRole } from '../enums';

export interface IJwtPayload {
  email: string;
  sub: string;
  role: UserRole;
}
