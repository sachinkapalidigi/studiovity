const mongoose = require("mongoose");
const Character = require("./character.model");

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

relationSchema.pre(/^find/, function (next) {
  // "this" is the current query
  this.populate("sourceCharacter").populate("targetCharacter");
  next();
});

const Relation = mongoose.model("Relation", relationSchema);

module.exports = Relation;
