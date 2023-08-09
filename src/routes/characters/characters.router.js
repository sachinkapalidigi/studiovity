const express = require("express");
const { createCharacterSchema } = require("./characters.validation");
const requestValidator = require("../../middlewares/requestValidator");
const {
  httpCreateCharacter,
  httpGetCharacter,
  httpUpdateCharacter,
  httpDeleteCharacter,
  httpGetCharacterRelationships,
  httpUploadCharacterPhotos,
} = require("./characters.controller");

const charactersRouter = express.Router();

charactersRouter
  .route("/")
  .get(function (req, res) {
    res.status(404).send();
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
    // implement if needed
    res.status(404).send();
  })
  .post(httpUploadCharacterPhotos);
// TODO: EDIT and DELETE photos

charactersRouter.route("/:id/relationships").get(httpGetCharacterRelationships);

module.exports = charactersRouter;
