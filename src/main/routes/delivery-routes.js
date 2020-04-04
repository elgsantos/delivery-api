const DeliveryRouter = require('../../presentation/routers/delivery-router');
const DeliveryUseCase = require('../../domain/usecases/delivery-usecase');
const DeliveryRepository = require('../../infra/repositories/delivery-repository');

module.exports = router => {
  const deliveryRepository = new DeliveryRepository();
  const deliveryUseCase = new DeliveryUseCase(deliveryRepository);
  const deliveryRouter = new DeliveryRouter(deliveryUseCase);
  router.post('/deliveries', deliveryRouter);
};
