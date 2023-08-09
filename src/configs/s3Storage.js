const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

class S3Storage extends StorageInterface {
  async upload(file) {
    // logic to upload to S3
    // NOTE: not good for large files
    const result = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.filename,
        Body: file.stream,
        // ... other options
      })
      .promise();

    return result;
  }

  async download(fileId) {
    // logic to download from S3
    throw new Error("Not implemented");
  }
}

module.exports = S3Storage;
