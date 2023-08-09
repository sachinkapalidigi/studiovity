const multer = require("multer");

// NOTE: In memory storage before uploading to s3, might cause problems
const storage = multer.memoryStorage(); // storing the file in memory before uploading to S3

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // set a limit of 5MB for files (adjust as needed)
  },
});

module.exports = {
  upload,
};
