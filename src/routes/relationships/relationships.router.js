const express = require("express");
const requestValidator = require("../../middlewares/requestValidator");
const {
  getRelationshipSchema,
  createRelationshipSchema,
} = require("./relationships.validation");
const {
  httpGetRelationship,
  httpCreateRelationship,
  httpGetRelationshipById,
  httpUpdateRelationship,
  httpDeleteRelationship,
} = require("./relationships.controller");

const relationshipsRouter = express.Router();

relationshipsRouter
  .route("/")
  .get(requestValidator(getRelationshipSchema, "query"), httpGetRelationship)
  .post(requestValidator(createRelationshipSchema), httpCreateRelationship);

relationshipsRouter
  .route("/:id")
  .get(httpGetRelationshipById)
  .put(requestValidator(createRelationshipSchema), httpUpdateRelationship) // NOTE: carefull while resuing logic here
  .delete(httpDeleteRelationship);

module.exports = relationshipsRouter;
