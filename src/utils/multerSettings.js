const multer = require("multer");
const fs = require("fs");
const path = require("path");

const dir = "./uploads";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// NOTE: In memory storage before uploading to s3, might cause problems
const storage = multer.memoryStorage(); // storing the file in memory before uploading to S3

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "/uploads/"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

const upload = multer({
  storage,
  // limits: {
  //   fileSize: 5 * 1024 * 1024, // set a limit of 5MB for files (adjust as needed)
  // },
});

// Adjust the multer middleware to handle multiple files
const uploadMultiple = upload.array("files", 10); // allowing up to 10 files to be uploaded simultaneously

module.exports = {
  upload,
  uploadMultiple,
};
