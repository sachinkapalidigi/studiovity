const express = require("express");

const api = express.Router();

// api.use("/auth", authRouter);

api.use("/health-check", (req, res) => {
  res.status(200).json({
    message: "Works like magic!",
  });
});

module.exports = api;
