const { MongoClient } = require('mongodb');

module.exports = {
  async connect (url) {
    this.url = url;
    this.connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.db = await this.connection.db();
  },

  async disconnect () {
    await this.connection.close();
    this.db = null;
  },

  async getCollection (name) {
    if (!this.connection.isConnected()) {
      await this.connect(this.url);
    }
    return this.db.collection(name);
  }
};
