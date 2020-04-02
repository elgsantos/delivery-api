const { MongoClient } = require('mongodb');
const { StringToDate } = require('../../presentation/helpers/date-converter');

let connection, db;

class LoadDeliveriesRepository {
  constructor (deliveryModel) {
    this.deliveryModel = deliveryModel;
  }

  async load () {
    const deliveries = await this.deliveryModel.find().toArray();
    return deliveries;
  }

  async loadById (id) {
    const deliveries = await this.deliveryModel.findOne({ _id: id });
    return deliveries;
  }
}

const makeSut = () => {
  const deliveryModel = db.collection('deliveries');
  const sut = new LoadDeliveriesRepository(deliveryModel);
  return {
    deliveryModel,
    sut
  };
};

const mockDelivery = {
  customer: 'Someone',
  deliveryDate: StringToDate('2010-01-01'),
  startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
  destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
};

describe('LoadDeliveries Repository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  beforeEach(async () => {
    await db.collection('deliveries').deleteMany();
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Should return empty if no delivery is found', async () => {
    const { sut } = makeSut();
    const deliveries = await sut.load();
    expect(deliveries).toEqual([]);
  });

  test('Should return a list of deliveries if any is found', async () => {
    const { sut, deliveryModel } = makeSut();
    let deliveries = [];
    await deliveryModel.insertOne({ _id: '1', ...mockDelivery });
    await deliveryModel.insertOne({ _id: '2', ...mockDelivery });
    deliveries = await sut.load();
    expect(Array.isArray(deliveries)).toBe(true);
    expect(deliveries.length).toBe(2);
    expect(deliveries[0]).toEqual({ _id: '1', ...mockDelivery });
  });

  test('Should return null if delivery is not found', async () => {
    const { sut } = makeSut();
    const deliveries = await sut.loadById('1');
    expect(deliveries).toBe(null);
  });

  test('Should return the specified delivery if found', async () => {
    const { sut, deliveryModel } = makeSut();
    await deliveryModel.insertOne({ _id: '1', ...mockDelivery });
    const delivery = await sut.loadById('1');
    expect(delivery).toEqual({ _id: '1', ...mockDelivery });
  });
});
