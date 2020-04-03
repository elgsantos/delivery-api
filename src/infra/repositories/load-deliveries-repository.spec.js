const MongoHelper = require('../helpers/mongo-helper');
const { StringToDate } = require('../../presentation/helpers/date-converter');
const LoadDeliveriesRepository = require('./load-deliveries-repository');
const { MissingParamError } = require('../../utils/errors');

let db;

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
    await MongoHelper.connect(process.env.MONGO_URL);
    db = await MongoHelper.getDb();
  });

  beforeEach(async () => {
    await db.collection('deliveries').deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return empty if no delivery is found on load()', async () => {
    const { sut } = makeSut();
    const deliveries = await sut.load();
    expect(deliveries).toEqual([]);
  });

  test('Should return a list of deliveries if any is found on load()', async () => {
    const { sut, deliveryModel } = makeSut();
    let deliveries = [];
    await deliveryModel.insertOne({ _id: '1', ...mockDelivery });
    await deliveryModel.insertOne({ _id: '2', ...mockDelivery });
    deliveries = await sut.load();
    expect(Array.isArray(deliveries)).toBe(true);
    expect(deliveries.length).toBe(2);
    expect(deliveries[0]).toEqual({ _id: '1', ...mockDelivery });
  });

  test('Should return null if delivery is not found on loadById()', async () => {
    const { sut } = makeSut();
    const deliveries = await sut.loadById('1');
    expect(deliveries).toBe(null);
  });

  test('Should return the specified delivery if found on loadById()', async () => {
    const { sut, deliveryModel } = makeSut();
    await deliveryModel.insertOne({ _id: '1', ...mockDelivery });
    const delivery = await sut.loadById('1');
    expect(delivery).toEqual({ _id: '1', ...mockDelivery });
  });

  test('Should throw if no deliveryModel is provided on load()', async () => {
    const sut = new LoadDeliveriesRepository();
    const promise = sut.load();
    expect(promise).rejects.toThrow();
  });

  test('Should throw if no deliveryModel is provided on loadById()', async () => {
    const sut = new LoadDeliveriesRepository();
    const promise = sut.loadById('1');
    expect(promise).rejects.toThrow();
  });

  test('Should throw if no id is provided on loadById()', async () => {
    const { sut } = makeSut();
    const promise = sut.loadById();
    expect(promise).rejects.toThrow(new MissingParamError(['id']));
  });
});
