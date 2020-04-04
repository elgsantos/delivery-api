const ExpressRouterAdapter = require('../adapters/express-router-adapter');
const deliveryRouter = require('../composers/delivery-router-composer');

module.exports = router => {
  router.post('/deliveries', ExpressRouterAdapter.adapt(deliveryRouter));
};
