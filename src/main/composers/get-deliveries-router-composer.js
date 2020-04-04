const GetDeliveriesRouter = require('../../presentation/routers/deliveries/get-deliveries-router');
const DeliveryUseCase = require('../../domain/usecases/delivery-usecase');
const DeliveryRepository = require('../../infra/repositories/delivery-repository');

module.exports = class GetDeliveriesRouterComposer {
  static compose () {
    const deliveryRepository = new DeliveryRepository();
    const deliveryUseCase = new DeliveryUseCase(deliveryRepository);
    return new GetDeliveriesRouter(deliveryUseCase);
  }
};
