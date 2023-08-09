const Joi = require("joi");
const mongoose = require("mongoose");

const emailValidator = (value) => {
  const schema = Joi.string().email();
  const { error } = schema.validate(value);
  if (error) {
    throw new Error("Please enter a valid email address");
  }
  return true;
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name should be atlest 3 characters"],
    maxLength: [255, "Name should be at most 255 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: emailValidator,
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be at least 8 characters"],
    maxLength: [255, "Password should be at most 255 characters"],
    select: false, // only works when used with find, else doesn't work
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
