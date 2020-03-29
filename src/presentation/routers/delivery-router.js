const HttpResponse = require('../helpers/http-response');

module.exports = class DeliveryRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError();
    }
    const { customer, deliveryDate, startAddress, destinationAddress } = httpRequest.body;
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
    if (errorParams) {
      return HttpResponse.badRequest(errorParams);
    }
  }
};
