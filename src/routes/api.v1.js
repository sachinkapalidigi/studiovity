const express = require("express");
const charactersRouter = require("./characters/characters.router");
const { protectRoute } = require("../middlewares/auth");
const authRouter = require("./auth/auth.router");
const relationshipsRouter = require("./relationships/relationships.router");

const api = express.Router();

api.use("/auth", authRouter);

api.use("/characters", charactersRouter);
api.use("/relationships", relationshipsRouter);

api.use("/health-check", protectRoute, (req, res) => {
  res.status(200).json({
    message: "Works like magic!",
  });
});

module.exports = api;
