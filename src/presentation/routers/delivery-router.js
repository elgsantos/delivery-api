const HttpResponse = require('../helpers/http-response');
const { MissingParamError } = require('../../utils/errors');

module.exports = class DeliveryRouter {
  constructor (deliveryUseCase) {
    this.deliveryUseCase = deliveryUseCase;
  }

  async route (httpRequest) {
    try {
      const {
        customer, deliveryDate, startAddress, destinationAddress
      } = httpRequest.body;
      const errorParams = [];
      if (!customer) {
        errorParams.push('customer');
      }
      if (!deliveryDate) {
        errorParams.push('deliveryDate');
      }
      if (!startAddress) {
        errorParams.push('startAddress');
      }
      if (!destinationAddress) {
        errorParams.push('destinationAddress');
      }
      if (errorParams.length > 0) {
        return HttpResponse.badRequest(new MissingParamError(errorParams));
      }
      await this.deliveryUseCase.create({ customer, deliveryDate, startAddress, destinationAddress });
      return HttpResponse.ok();
    } catch (error) {
      // if undefined objects: httpRequest, httpRequest.body, deliveryUseCase,deliveryUseCase.create...
      // console.error(error);
      return HttpResponse.serverError();
    }
  }
};
