import { createObjectSchema } from '../validation/joi/createObjectSchema';
import { extendedJoi } from '../validation/joi/extendedJoi';
import type { AppConfigs } from './AppConfigs';

export const appConfigValidationSchema = createObjectSchema<AppConfigs>({
  API_PORT: extendedJoi.number().positive(),
  PG_HOST: extendedJoi.string().min(1),
  PG_DB_NAME: extendedJoi.string().min(1),
  PG_PASSWORD: extendedJoi.string().min(1),
  PG_PORT: extendedJoi.number().positive(),
  PG_USER: extendedJoi.string().min(1),
});
