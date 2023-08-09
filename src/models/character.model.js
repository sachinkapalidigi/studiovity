const mongoose = require("mongoose");
const Relation = require("./relation.model");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  // relations: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Relation",
  //   },
  // ],
  // properties: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Property",
  //   },
  // ],
});

characterSchema.pre("remove", async function (next) {
  // 'this' refers to the character document being removed
  await Relation.deleteMany({
    $or: [{ sourceCharacter: this._id }, { targetCharacter: this._id }],
  });
  next();
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
