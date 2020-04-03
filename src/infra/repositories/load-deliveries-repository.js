const { MissingParamError } = require('../../utils/errors');
module.exports = class LoadDeliveriesRepository {
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
}
;
