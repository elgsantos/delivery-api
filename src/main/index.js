const MongoHelper = require('../infra/helpers/mongo-helper');
const env = require('./config/env');

const makeServer = () => {
  MongoHelper.connect(env.mongoUrl)
    .then(() => {
      const app = require('./app');

      return app.listen(env.port, function () {
        console.log(`Server running on port ${this.address().port}`);
      });
    }).catch(console.error);
};

makeServer();
