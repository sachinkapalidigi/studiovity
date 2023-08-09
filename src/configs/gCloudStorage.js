class GCloudStorage extends StorageInterface {
  async upload(file) {
    // logic to upload to Google Cloud Storage
    throw new Error("Not implemented");
  }

  async download(fileId) {
    // logic to download from Google Cloud Storage
    throw new Error("Not implemented");
  }
}
module.exports = GCloudStorage;
