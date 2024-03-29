const MongoHelper = require('../helpers/mongo-helper');
const { StringToDate } = require('../../presentation/helpers/date-converter');
const DeliveryRepository = require('./delivery-repository');
const { MissingParamError } = require('../../utils/errors');

let deliveryModel;

const makeSut = () => {
  return new DeliveryRepository();
};

const mockDelivery = {
  customer: 'Someone',
  deliveryDate: StringToDate('2010-01-01'),
  startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
  destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
};

describe('Deliveries Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    deliveryModel = await MongoHelper.getCollection('deliveries');
  });

  beforeEach(async () => {
    await deliveryModel.deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return empty if no delivery is found on load()', async () => {
    const sut = makeSut();
    const deliveries = await sut.load();
    expect(deliveries).toEqual([]);
  });

  test('Should return a list of deliveries if any is found on load()', async () => {
    const sut = makeSut();
    let deliveries = [];
    await deliveryModel.insertOne({ _id: '1', ...mockDelivery });
    await deliveryModel.insertOne({ _id: '2', ...mockDelivery });
    deliveries = await sut.load();
    expect(Array.isArray(deliveries)).toBe(true);
    expect(deliveries.length).toBe(2);
    expect(deliveries[0]).toEqual({ _id: '1', ...mockDelivery });
  });

  test('Should return null if delivery is not found on loadById()', async () => {
    const sut = makeSut();
    const deliveries = await sut.loadById('1');
    expect(deliveries).toBe(null);
  });

  test('Should return the specified delivery if found on loadById()', async () => {
    const sut = makeSut();
    await deliveryModel.insertOne({ _id: '1', ...mockDelivery });
    const delivery = await sut.loadById('1');
    expect(delivery).toEqual({ _id: '1', ...mockDelivery });
  });

  test('Should throw if no id is provided on loadById()', async () => {
    const sut = makeSut();
    const promise = sut.loadById();
    expect(promise).rejects.toThrow(new MissingParamError(['id']));
  });

  test('Should create a delivery on create()', async () => {
    const sut = makeSut();
    const result = await sut.create(mockDelivery);
    expect(result.customer).toBe(mockDelivery.customer);
    expect(result.deliveryDate).toBe(mockDelivery.deliveryDate);
    expect(result.startAddress).toBe(mockDelivery.startAddress);
    expect(result.destinationAddress).toBe(mockDelivery.destinationAddress);
  });

  test('Should throw if no params are provided on create()', async () => {
    const sut = new DeliveryRepository();
    expect(sut.create()).rejects.toThrow(new MissingParamError(['delivery']));
    expect(sut.create({}))
      .rejects.toThrow(new MissingParamError(['customer']));
    expect(sut.create({ customer: mockDelivery.customer }))
      .rejects.toThrow(new MissingParamError(['deliveryDate']));
    expect(sut.create({ customer: mockDelivery.customer, deliveryDate: mockDelivery.deliveryDate }))
      .rejects.toThrow(new MissingParamError(['startAddress']));
    expect(sut.create({
      customer: mockDelivery.customer,
      deliveryDate: mockDelivery.deliveryDate,
      startAddress: mockDelivery.startAddress
    })).rejects.toThrow(new MissingParamError(['customer']));
  });

  test('Should throw if delivery not inserted on create()', async () => {
    const sut = makeSut();
    await sut.create({ _id: '1', ...mockDelivery });
    const promise = sut.create({ _id: '1', ...mockDelivery });
    expect(promise).rejects.toThrow();
  });
});
