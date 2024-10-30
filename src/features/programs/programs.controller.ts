import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { Roles, UserRole } from 'src/features/auth';
import { JoiValidationPipe } from 'src/pipes';

import { CreateProgramDto, UpdateProgramDto } from './dto';
import { ProgramsService } from './programs.service';
import { createProgramSchema, updateProgramSchema } from './validations';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @Roles(UserRole.Admin)
  create(@Body(new JoiValidationPipe(createProgramSchema)) createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new JoiValidationPipe(updateProgramSchema)) updateProgramDto: UpdateProgramDto,
  ) {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.programsService.remove(id);
  }
}
