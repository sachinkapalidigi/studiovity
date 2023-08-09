const express = require("express");
const requestValidator = require("../../middlewares/requestValidator");
const { createUserSchema, loginSchema } = require("./auth.validation");
const { httpLoginUser, httpCreateUser } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/login", requestValidator(loginSchema), httpLoginUser);
authRouter.post(
  "/register",
  requestValidator(createUserSchema),
  httpCreateUser
);

module.exports = authRouter;
