const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// TODO: Use async functions to hash and verify
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (password, savedPassword) => {
  return bcrypt.compareSync(password, savedPassword);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Token verification failed:", err.message);
    // Handle the error appropriately, e.g., return null or throw a custom error
    return null;
  }
};

module.exports = { hashPassword, verifyPassword, generateToken, verifyToken };
