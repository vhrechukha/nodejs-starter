import Joi = require('joi');
import { extendedJoi } from './extendedJoi';

export const createObjectSchema = <TDataStructure>(
  schemaMap: Joi.StrictSchemaMap<TDataStructure>
): Joi.ObjectSchema<Joi.StrictSchemaMap<TDataStructure>> =>
  extendedJoi.object<TDataStructure, true, TDataStructure>().keys(schemaMap) as unknown as Joi.ObjectSchema<
    Joi.StrictSchemaMap<TDataStructure>
  >;
