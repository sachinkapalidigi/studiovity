const storageProviders = {
  s3: S3Storage,
  gcloud: GCloudStorage,
  // ... other providers
};

class StorageService {
  constructor(provider) {
    const StorageClass = storageProviders[provider];
    if (!StorageClass) {
      throw new Error(`Provider ${provider} not found`);
    }
    this.storage = new StorageClass();
  }

  async upload(file) {
    return this.storage.upload(file);
  }

  async download(fileId) {
    return this.storage.download(fileId);
  }
}

module.exports = StorageService;
