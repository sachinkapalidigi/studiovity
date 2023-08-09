const express = require("express");

const charactersRouter = express.Router();

charactersRouter
  .route("/")
  .get(function (req, res) {
    res.send(404);
  })
  .post(function (req, res) {
    res.send(404);
  });

charactersRouter
  .route("/:id")
  .get(function (req, res) {
    res.send(404);
  })
  .put(function (req, res) {
    res.send(404);
  })
  .delete(function (req, res) {});

module.exports = charactersRouter;
