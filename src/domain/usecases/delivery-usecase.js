const { MissingParamError } = require('../../utils/errors');
const { StringToDate } = require('../../presentation/helpers/date-converter');

module.exports = class DeliveryUseCase {
  constructor (deliveryRepository) {
    this.deliveryRepository = deliveryRepository;
  }

  async create (delivery) {
    if (!delivery) {
      throw new MissingParamError(['delivery']);
    }
    if (!delivery.customer) {
      throw new MissingParamError(['customer']);
    }
    if (!delivery.deliveryDate) {
      throw new MissingParamError(['deliveryDate']);
    }
    if (!delivery.startAddress) {
      throw new MissingParamError(['startAddress']);
    }
    if (!delivery.destinationAddress) {
      throw new MissingParamError(['destinationAddress']);
    }

    this.customer = delivery.customer;
    this.deliveryDate = StringToDate(delivery.deliveryDate);
    this.startAddress = delivery.startAddress;
    this.destinationAddress = delivery.destinationAddress;

    const result = await this.deliveryRepository.create({
      customer: this.customer,
      deliveryDate: this.deliveryDate,
      startAddress: this.startAddress,
      destinationAddress: this.destinationAddress
    });
    return result;
  }

  async load () {
    const deliveries = this.deliveryRepository.load();
    return deliveries;
  }
};
