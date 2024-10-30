import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Program } from './entities';
import { ProgramsController } from './programs.controller';
import { ProgramsRepository } from './programs.repository';
import { ProgramsService } from './programs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramsRepository],
})
export class ProgramsModule {}
