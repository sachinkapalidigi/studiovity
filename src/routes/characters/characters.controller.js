const Character = require("../../models/character.model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

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

module.exports = {
  httpCreateCharacter,
  httpGetCharacter,
  httpUpdateCharacter,
  httpDeleteCharacter,
};
