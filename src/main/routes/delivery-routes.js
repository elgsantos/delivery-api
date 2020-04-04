const DeliveryRouterComposer = require('../composers/delivery-router-composer');
const { adapt } = require('../adapters/express-router-adapter');

module.exports = router => {
  router.post('/deliveries', adapt(DeliveryRouterComposer.compose()));
};
