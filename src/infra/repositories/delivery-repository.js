const { MissingParamError } = require('../../utils/errors');
module.exports = class DeliveryRepository {
  constructor (deliveryModel) {
    this.deliveryModel = deliveryModel;
  }

  async load () {
    const deliveries = await this.deliveryModel.find().toArray();
    return deliveries;
  }

  async loadById (id) {
    if (!id) {
      throw new MissingParamError(['id']);
    }
    const deliveries = await this.deliveryModel.findOne({ _id: id });
    return deliveries;
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
    const result = await this.deliveryModel.insertOne(delivery);
    return result.ops[0];
  }
};
