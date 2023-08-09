const mongoose = require("mongoose");

const relationSchema = new mongoose.Schema({
  relationshipType: {
    type: String,
    required: true,
  },
  reverseRelationshipType: {
    type: String,
    required: true,
  },
  sourceCharacter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  targetCharacter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
});

const Relation = mongoose.model("Relation", relationSchema);

module.exports = Relation;
