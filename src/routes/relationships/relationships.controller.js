const Character = require("../../models/character.model");
const Relation = require("../../models/relation.model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const httpGetRelationship = catchAsync(async (req, res) => {
  const { characterA, characterB } = req.query;
  const relationship = await Relation.findOne({
    $or: [
      { sourceCharacter: characterA, targetCharacter: characterB },
      { sourceCharacter: characterB, targetCharacter: characterA },
    ],
  });

  if (!relationship) {
    throw new AppError("Relationship not found", 404);
  }
  return res.status(200).json({
    status: "success",
    data: {
      relationship,
    },
  });
});

const httpCreateRelationship = catchAsync(async (req, res) => {
  const {
    relationshipType,
    reverseRelationshipType,
    sourceCharacter,
    targetCharacter,
  } = req.body;
  // Check if both characters exist
  const sourceExists = await Character.findById(sourceCharacter);
  const targetExists = await Character.findById(targetCharacter);
  if (!sourceExists || !targetExists) {
    throw new AppError("Invalid source/target character", 400);
  }
  const newRelationship = await Relation.create({
    relationshipType,
    reverseRelationshipType,
    sourceCharacter,
    targetCharacter,
  });
  return res.status(201).json({
    status: "success",
    data: {
      relationship: newRelationship,
    },
  });
});

const httpGetRelationshipById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const relationship = await Relation.findById(id);
  if (!relationship) {
    throw new AppError("Relationship not found", 404);
  }
  return res.status(200).json({
    status: "success",
    data: {
      relationship,
    },
  });
});

const httpUpdateRelationship = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    relationshipType,
    reverseRelationshipType,
    sourceCharacter,
    targetCharacter,
  } = req.body;
  // Check if both characters exist
  const sourceExists = await Character.findById(sourceCharacter);
  const targetExists = await Character.findById(targetCharacter);
  if (!sourceExists || !targetExists) {
    throw new AppError("Invalid source/target character", 400);
  }

  const updatedRelationship = await Relation.findByIdAndUpdate(
    id,
    {
      sourceCharacter,
      targetCharacter,
      relationshipType,
      reverseRelationshipType,
    },
    {
      returnDocument: "after",
    }
  );

  return res.status(200).json({
    status: "success",
    data: {
      relationship: updatedRelationship,
    },
  });
});

const httpDeleteRelationship = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Relation.deleteOne({
    _id: id,
  });
  return res.status(200).json({
    status: "success",
    data: {},
  });
});

module.exports = {
  httpGetRelationship,
  httpCreateRelationship,
  httpGetRelationshipById,
  httpUpdateRelationship,
  httpDeleteRelationship,
};
