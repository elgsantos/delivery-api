const DeliveryRouter = require('../../presentation/routers/delivery-router');
const DeliveryUseCase = require('../../domain/usecases/delivery-usecase');
const DeliveryRepository = require('../../infra/repositories/delivery-repository');

const deliveryRepository = new DeliveryRepository();
const deliveryUseCase = new DeliveryUseCase(deliveryRepository);
const deliveryRouter = new DeliveryRouter(deliveryUseCase);

module.exports = deliveryRouter;
