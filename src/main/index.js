const MongoHelper = require('../infra/helpers/mongo-helper');
const env = require('./config/env');

const makeServer = () => {
  MongoHelper.connect(env.mongoUrl)
    .then(() => {
      const app = require('./app');
      const port = process.env.PORT || 3333;

      return app.listen(port, function () {
        console.log(`Server running on port ${this.address().port}`);
      });
    }).catch(console.error);
};

makeServer();
