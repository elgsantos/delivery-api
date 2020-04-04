module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/delivery-api',
  port: process.env.PORT || 3333
};
