const express = require("express");
const { createCharacterSchema } = require("./characters.validation");
const requestValidator = require("../../middlewares/requestValidator");
const {
  httpCreateCharacter,
  httpGetCharacter,
  httpUpdateCharacter,
  httpDeleteCharacter,
} = require("./characters.controller");

const charactersRouter = express.Router();

charactersRouter
  .route("/")
  .get(function (req, res) {
    res.send(404);
  })
  .post(requestValidator(createCharacterSchema), httpCreateCharacter);

charactersRouter
  .route("/:id")
  .get(httpGetCharacter)
  .put(requestValidator(createCharacterSchema), httpUpdateCharacter) // NOTE: carefull while resuing logic here
  .delete(httpDeleteCharacter);

charactersRouter
  .route("/:id/photos")
  .get(function (req, res) {
    res.send(404);
  })
  .post(function (req, res) {
    res.send(404);
  });

charactersRouter.route("/:id/relationships").get(function (req, res) {
  res.send(404);
});

module.exports = charactersRouter;
