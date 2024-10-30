import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { UserRole, UserStatus } from '../../auth/enums';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: UserRole;

  @Column({ default: UserStatus.Active })
  status: UserStatus;
}
