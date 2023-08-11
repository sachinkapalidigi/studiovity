const Character = require("../../models/character.model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const CharacterRelations = require("../../utils/characterRelations");
const {
  fillHTMLTemplate,
  fillCSVTemplate,
  fillXLSXTemplate,
} = require("../../utils/fillCharacterReport");
const generatePDF = require("../../utils/generatePDF");
const setReportHeaders = require("../../utils/setReportHeaders");
const StorageService = require("../../utils/storageService");

const storageService = new StorageService("s3"); // use env to switch if needed

const httpGetCharacters = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const characters = await Character.find().skip(skip).limit(limit);
  const totalCount = await Character.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);
  return res.status(200).json({
    status: "success",
    data: {
      characters: characters,
      totalPages,
      totalCount,
    },
  });
});

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
  returnNested = returnNested === "true" ? true : false;
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

const httpDownloadCharacterReport = catchAsync(async (req, res) => {
  const { format } = req.query;
  const { id } = req.params;

  const character = await Character.findById(id);
  if (!character) {
    throw new AppError("Couldn't find character", 404);
  }
  const characterRelations = new CharacterRelations(id, false);
  const relationships = await characterRelations.fetchRelationships(id);

  setReportHeaders(format, res);

  switch (format) {
    case "pdf":
      const pdfHTML = fillHTMLTemplate(character, relationships);
      const pdfBuffer = await generatePDF(pdfHTML);
      return res.send(pdfBuffer);

    case "csv":
      const csvContent = fillCSVTemplate(character, relationships);
      return res.send(csvContent);

    case "xlsx":
      const workbook = fillXLSXTemplate(character, relationships);
      await workbook.xlsx.write(res);
      return res.status(200).end();

    default:
      break;
  }

  return res.status(400).json({ status: "failure", message: "Invalid format" });
});

module.exports = {
  httpGetCharacters,
  httpCreateCharacter,
  httpGetCharacter,
  httpUpdateCharacter,
  httpDeleteCharacter,
  httpGetCharacterRelationships,
  httpUploadCharacterPhotos,
  httpDownloadCharacterReport,
};
