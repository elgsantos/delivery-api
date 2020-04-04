const CreateDeliveryRouterComposer = require('../composers/create-delivery-router-composer');
const GetDeliveriesRouterComposer = require('../composers/get-deliveries-router-composer');
const { adapt } = require('../adapters/express-router-adapter');

module.exports = router => {
  router.post('/deliveries', adapt(CreateDeliveryRouterComposer.compose()));
  router.get('/deliveries', adapt(GetDeliveriesRouterComposer.compose()));
};
