const CreateDeliveryRouter = require('../../presentation/routers/deliveries/create-delivery-router');
const DeliveryUseCase = require('../../domain/usecases/delivery-usecase');
const DeliveryRepository = require('../../infra/repositories/delivery-repository');

module.exports = class DeliveryRouterComposer {
  static compose () {
    const deliveryRepository = new DeliveryRepository();
    const deliveryUseCase = new DeliveryUseCase(deliveryRepository);
    return new CreateDeliveryRouter(deliveryUseCase);
  }
};
