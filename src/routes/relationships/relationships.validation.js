const express = require("express");

const relationshipsRouter = express.Router();

relationshipsRouter
  .route("/")
  .get(function (req, res) {
    res.send(404);
  })
  .post(function (req, res) {
    res.send(404);
  });

relationshipsRouter
  .route("/:id")
  .get(function (req, res) {
    res.send(404);
  })
  .put(function (req, res) {
    res.send(404);
  })
  .delete(function (req, res) {
    res.send(404);
  });
