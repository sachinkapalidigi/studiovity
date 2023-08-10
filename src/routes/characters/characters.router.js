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
  httpGetCharacters,
} = require("./characters.controller");
const { uploadMultiple } = require("../../utils/multerSettings");

const charactersRouter = express.Router();

charactersRouter
  .route("/")
  .get(httpGetCharacters)
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
    res.status(404).send({ message: "Route not found" });
  })
  .post(uploadMultiple, httpUploadCharacterPhotos);
// TODO: EDIT and DELETE photos

charactersRouter.route("/:id/relationships").get(httpGetCharacterRelationships);

module.exports = charactersRouter;
