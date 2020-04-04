const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('../helpers/mongo-helper');
module.exports = class DeliveryRepository {
  async load () {
    const db = await MongoHelper.getDb();
    const deliveries = await db.collection('deliveries').find().toArray();
    return deliveries;
  }

  async loadById (id) {
    if (!id) {
      throw new MissingParamError(['id']);
    }
    const db = await MongoHelper.getDb();
    const delivery = await db.collection('deliveries').findOne({ _id: id });
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
    const db = await MongoHelper.getDb();
    const result = await db.collection('deliveries').insertOne(delivery);
    return result.ops[0];
  }
};
