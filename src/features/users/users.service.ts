import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  private cryptPass = (password: string) => bcrypt.hash(password, bcrypt.genSaltSync());

  async create(createUserDto: CreateUserDto) {
    const entity = this.usersRepository.create(createUserDto);
    entity.password = await this.cryptPass(createUserDto.password);

    await this.usersRepository.save(entity);

    return entity;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const entity = await this.usersRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async findByEmail(email: string) {
    const entity = await this.usersRepository.findOneBy({ email });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async doesUserExist(email: string) {
    const entity = await this.usersRepository.exist({ where: { email } });

    return !!entity;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.usersRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    const hashedPasswordUpdate = updateUserDto.password
      ? { password: await this.cryptPass(updateUserDto.password) }
      : {};

    await this.usersRepository.save({
      id: entity.id,
      ...updateUserDto,
      ...hashedPasswordUpdate,
    });

    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const entity = await this.usersRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    await this.usersRepository.remove(entity);
  }
}
