const Joi = require("joi");

const requestValidator = (schema, rvt = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[rvt]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    return next();
  };
};

module.exports = requestValidator;
