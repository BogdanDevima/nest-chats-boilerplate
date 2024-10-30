import * as Joi from 'joi';

import { CreateProgramDto } from '../dto';

export const createProgramSchema = Joi.object<CreateProgramDto>({
  name: Joi.string().trim().required().max(255),
});
