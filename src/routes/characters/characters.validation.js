const Joi = require("joi");

const createCharacterSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().required(), // TODO: make it enum
  occupation: Joi.string().required(),
});

module.exports = {
  createCharacterSchema,
};
