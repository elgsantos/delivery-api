const { MongoClient } = require('mongodb');

module.exports = {
  async connect (url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.db = await this.connection.db(dbName);
  },

  async disconnect () {
    await this.connection.close();
    this.db = null;
  },

  async getCollection (name) {
    if (!this.connection.isConnected()) {
      await this.connect(this.url, this.dbName);
    }
    return this.db.collection(name);
  }
};
