const joi = require("joi");

const createUserSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(50).required(),
});

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(50).required(),
});

module.exports = { createUserSchema, loginSchema };
