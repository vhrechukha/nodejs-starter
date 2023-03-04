import Joi = require('joi');

interface ExtendedJoiRoot extends Joi.Root {
  arrayOrSingleAsArray(): Joi.ArraySchema;
  e164PhoneNumber(): Joi.StringSchema;
}

const arrayCastJoiExtension: Joi.Extension = {
  type: 'arrayOrSingleAsArray',
  base: Joi.array(),
  coerce(value) {
    const newValue = Array.isArray(value) ? value : [value];

    return {
      value: newValue,
    };
  },
};

export const extendedJoi: ExtendedJoiRoot = Joi.extend(arrayCastJoiExtension);
