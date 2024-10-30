import * as Joi from 'joi';

import { UpdateProgramDto } from '../dto';

export const updateProgramSchema = Joi.object<UpdateProgramDto>({
  name: Joi.string().trim().max(255),
});
