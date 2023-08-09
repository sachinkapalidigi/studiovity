class StorageInterface {
  async upload(file) {
    throw new Error("Not implemented");
  }

  async download(fileId) {
    throw new Error("Not implemented");
  }

  // ... additional methods like delete, etc.
}

module.exports = StorageInterface;
