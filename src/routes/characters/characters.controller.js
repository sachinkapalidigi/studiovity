const Character = require("../../models/character.model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const CharacterRelations = require("../../utils/characterRelations");
const { upload } = require("../../utils/multerSettings");
const StorageService = require("../../utils/storageService");

// Adjust the multer middleware to handle multiple files
const uploadMultiple = upload.array("photos", 10); // allowing up to 10 photos to be uploaded simultaneously
const storageService = new StorageService("s3"); // use env to switch if needed

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

const httpUploadCharacterPhotos = catchAsync(async (req, res) => {
  const character = await Character.findById(req.params.id);
  if (!character) {
    throw new AppError("Couldn't find character", 404);
  }

  // NOTE: Change to single file upload if this is heavy
  uploadMultiple(req, res, async (err) => {
    if (err) {
      throw new AppError(`Upload error: ${err.message}`, 500);
    }

    const uploadedUrls = [];
    for (let file of req.files) {
      // Upload each file to S3
      const uploadResult = await storageService.upload(file);
      uploadedUrls.push(uploadResult.Location);

      // Add the URL to the character's photos array
      character.photos.push(uploadResult.Location);
    }

    await character.save();
    return res
      .status(200)
      .json({ status: "success", data: { photos: uploadedUrls } });
  });
});

module.exports = {
  httpCreateCharacter,
  httpGetCharacter,
  httpUpdateCharacter,
  httpDeleteCharacter,
  httpGetCharacterRelationships,
  httpUploadCharacterPhotos,
};
