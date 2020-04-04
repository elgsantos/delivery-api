const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('../helpers/mongo-helper');
module.exports = class DeliveryRepository {
  async load () {
    const deliveryModel = await MongoHelper.getCollection('deliveries');
    const deliveries = deliveryModel.find().toArray();
    return deliveries;
  }

  async loadById (id) {
    if (!id) {
      throw new MissingParamError(['id']);
    }
    const deliveryModel = await MongoHelper.getCollection('deliveries');
    const delivery = await deliveryModel.findOne({ _id: id });
    return delivery;
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
    const deliveryModel = await MongoHelper.getCollection('deliveries');
    const result = await deliveryModel.insertOne(delivery);
    return result.ops[0];
  }
};
