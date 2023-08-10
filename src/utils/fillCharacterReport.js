const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

function fillHTMLTemplate(character, relations) {
  let relationsHTML = relations
    .map(
      (relation) =>
        `<li>${relation.sourceCharacter.name} is ${relation.relationshipType} of ${relation.targetCharacter.name}</li>`
    )
    .join("");
  let photosHTML = character.photos
    .map(
      (photo) => `<img src="${photo}" alt="${character.name}" class="photo">`
    )
    .join("");
  const templatePath = path.resolve(
    __dirname,
    "../templates/characterReport.html"
  );
  let template = fs.readFileSync(templatePath, "utf8");

  return template
    .replace("{{name}}", character.name)
    .replace("{{age}}", character.age)
    .replace("{{gender}}", character.gender)
    .replace("{{occupation}}", character.occupation)
    .replace("{{relations}}", relationsHTML)
    .replace("{{photos}}", photosHTML);
}

function flattenCharacterRelations(character, relations) {
  return {
    name: character.name,
    age: character.age.toString(),
    gender: character.gender,
    occupation: character.occupation,
    photos: character.photos.join("; "),
    relations: relations
      .map(
        (relation) =>
          `${relation.sourceCharacter.name} is ${relation.relationshipType} of ${relation.targetCharacter.name}.`
      )
      .join("; "),
  };
}

function fillCSVTemplate(character, relations) {
  const flattenedData = flattenCharacterRelations(character, relations);
  const csvContent = [
    Object.keys(flattenedData).join(","),
    Object.values(flattenedData).join(","),
  ].join("\n");
  return csvContent;
}

function fillXLSXTemplate(character, relations) {
  // Create a new instance of a Workbook class
  const workbook = new ExcelJS.Workbook();

  // Add a Worksheet
  const worksheet = workbook.addWorksheet("Character Data");

  worksheet.columns = [
    { header: "Name", key: "name", width: 10 },
    { header: "Age", key: "age", width: 10 },
    { header: "Gender", key: "gender", width: 10 },
    { header: "Occupation", key: "occupation", width: 15 },
    { header: "Relations", key: "relations", width: 30 },
    { header: "Photos", key: "photos", width: 30 },
  ];
  worksheet.addRow({
    name: character.name,
    age: character.age,
    gender: character.gender,
    occupation: character.occupation,
    relations: relations
      .map(
        (relation) =>
          `${relation.sourceCharacter.name} is ${relation.relationshipType} of ${relation.targetCharacter.name}.`
      )
      .join(", "),
    photos: character.photos.join(", "),
  });
  return workbook;
}

module.exports = {
  fillHTMLTemplate,
  fillCSVTemplate,
  fillXLSXTemplate,
};
