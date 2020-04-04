const router = require('express').Router();
const fg = require('fast-glob');

module.exports = app => {
  app.get('/', (req, res) => res.redirect('https://github.com/elgsantos/delivery-api'));
  app.use('/api', router);
  fg.sync('**/src/main/routes/**routes.js').forEach(file =>
    require(`../../../${file}`)(router)
  );
};
