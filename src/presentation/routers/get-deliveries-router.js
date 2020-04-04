const HttpResponse = require('../helpers/http-response');

module.exports = class GetDeliveriesRouter {
  constructor (deliveryUseCase) {
    this.deliveryUseCase = deliveryUseCase;
  }

  async route () {
    try {
      const deliveries = await this.deliveryUseCase.load();
      return HttpResponse.ok(deliveries);
    } catch (error) {
      // console.error(error);
      return HttpResponse.serverError();
    }
  }
};
