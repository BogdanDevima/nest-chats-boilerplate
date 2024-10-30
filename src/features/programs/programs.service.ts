import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProgramDto, UpdateProgramDto } from './dto';
import { ProgramsRepository } from './programs.repository';

@Injectable()
export class ProgramsService {
  constructor(private programsRepository: ProgramsRepository) {}

  async create(createProgramDto: CreateProgramDto) {
    const entity = this.programsRepository.create(createProgramDto);
    await this.programsRepository.save(entity);

    return entity;
  }

  findAll() {
    return this.programsRepository.find();
  }

  async findOne(id: string) {
    const entity = await this.programsRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    const entity = await this.programsRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    await this.programsRepository.save({ id: entity.id, ...updateProgramDto });

    return this.programsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const entity = await this.programsRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    await this.programsRepository.remove(entity);
  }
}
