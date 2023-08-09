const Joi = require("joi");

const getRelationshipSchema = Joi.object({
  characterA: Joi.string().required(),
  characterB: Joi.string().required(),
});

const createRelationshipSchema = Joi.object({
  relationshipType: Joi.string().required(),
  reverseRelationshipType: Joi.string().required(),
  sourceCharacter: Joi.string().required(),
  targetCharacter: Joi.string().required(),
});

module.exports = { createRelationshipSchema, getRelationshipSchema };
