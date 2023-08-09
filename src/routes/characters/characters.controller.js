const Character = require("../../models/character.model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const CharacterRelations = require("../../utils/characterRelations");

const httpCreateCharacter = catchAsync(async (req, res) => {
  const { name, age, gender, occupation } = req.body;
  const newCharacter = await Character.create({
    name,
    age,
    gender,
    occupation,
    photos: [],
  });
  return res.status(201).json({
    status: "success",
    data: {
      character: newCharacter,
    },
  });
});

const httpGetCharacter = catchAsync(async (req, res) => {
  const { id } = req.params;
  const character = await Character.findById(id);
  if (!character) {
    throw new AppError("Couldn't find character", 404);
  }
  return res.status(200).json({
    status: "success",
    data: {
      character,
    },
  });
});

const httpUpdateCharacter = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, occupation } = req.body;
  const updatedCharacter = await Character.findByIdAndUpdate(
    id,
    {
      name,
      age,
      gender,
      occupation,
    },
    {
      returnDocument: "after",
    }
  );
  return res.status(200).json({
    status: "success",
    data: {
      character: updatedCharacter,
    },
  });
});

const httpDeleteCharacter = catchAsync(async (req, res) => {
  const { id } = req.params;
  // TODO: Change to soft delete
  await Character.deleteOne({
    _id: id,
  });
  return res.status(200).json({
    status: "deleted",
    data: {},
  });
});

const httpGetCharacterRelationships = catchAsync(async (req, res) => {
  const { id } = req.params;
  let { returnNested = "false" } = req.query;
  returnNested === "false" ? false : true;
  const characterRelations = new CharacterRelations(id, returnNested);

  const relationships = await characterRelations.fetchRelationships(id);

  if (!relationships) {
    throw new AppError(
      "Couldnot find relationships for the given character",
      400
    );
  }
  return res.status(200).json({
    status: "success",
    data: {
      relationships,
    },
  });
});

module.exports = {
  httpCreateCharacter,
  httpGetCharacter,
  httpUpdateCharacter,
  httpDeleteCharacter,
  httpGetCharacterRelationships,
};
