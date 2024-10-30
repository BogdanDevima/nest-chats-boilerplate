import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../common/base.repository';

import { Program } from './entities';

@Injectable()
export class ProgramsRepository extends BaseRepository<Program> {
  constructor(dataSource: DataSource) {
    super(Program, dataSource);
  }
}
