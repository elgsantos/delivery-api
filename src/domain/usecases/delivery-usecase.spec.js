const { MissingParamError } = require('../../utils/errors');
const { StringToDate } = require('../../presentation/helpers/date-converter');
const DeliveryUseCase = require('./delivery-usecase');

const makeSut = () => {
  class DeliveryRepositorySpy {
    async create (delivery) {
      this.customer = delivery.customer;
      this.deliveryDate = delivery.deliveryDate;
      this.startAddress = delivery.startAddress;
      this.destinationAddress = delivery.destinationAddress;
    }
  }
  const deliveryRepositorySpy = new DeliveryRepositorySpy();
  const sut = new DeliveryUseCase(deliveryRepositorySpy);
  return {
    sut,
    deliveryRepositorySpy
  };
};

describe('Delivery UseCase', () => {
  test('Should throw if no customer is provided on create', async () => {
    const { sut } = makeSut();
    const promise = sut.create();
    expect(promise).rejects.toThrow(new MissingParamError(['customer']));
  });

  test('Should throw if no deliveryDate is provided on create', async () => {
    const { sut } = makeSut();
    const promise = sut.create({ customer: 'any_customer' });
    expect(promise).rejects.toThrow(new MissingParamError(['deliveryDate']));
  });

  test('Should throw if no startAddress is provided on create', async () => {
    const { sut } = makeSut();
    const promise = sut.create({ customer: 'any_customer', deliveryDate: '2020-12-20' });
    expect(promise).rejects.toThrow(new MissingParamError(['startAddress']));
  });

  test('Should throw if no destinationAddress is provided on create', async () => {
    const { sut } = makeSut();
    const promise = sut.create({
      customer: 'any_customer',
      deliveryDate: '2020-12-20',
      startAddress: 'any_address'
    });
    expect(promise).rejects.toThrow(new MissingParamError(['destinationAddress']));
  });

  test('Should if no delivery is provided on create', async () => {
    const { sut } = makeSut();
    const promise = sut.create();
    expect(promise).rejects.toThrow(new MissingParamError(['delivery']));
  });

  test('Should call DeliveryRepository with right params on create', async () => {
    const { sut, deliveryRepositorySpy } = makeSut();
    await sut.create({
      customer: 'any_customer',
      deliveryDate: '2020-12-20',
      startAddress: 'any_address',
      destinationAddress: 'any_dest_address'
    });
    expect(deliveryRepositorySpy.customer).toBe('any_customer');
    expect(deliveryRepositorySpy.deliveryDate).toEqual(StringToDate('2020-12-20'));
    expect(deliveryRepositorySpy.startAddress).toBe('any_address');
    expect(deliveryRepositorySpy.destinationAddress).toBe('any_dest_address');
  });

  test('Should throw if no DeliveryRepository is provided', async () => {
    const sut = new DeliveryUseCase();
    const promise = sut.create('any_customer', '2020-12-20', 'any_address', 'any_dest_address');
    expect(promise).rejects.toThrow(new MissingParamError(['deliveryRepository']));
  });

  test('Should throw if DeliveryRepository has no create method', async () => {
    const sut = new DeliveryUseCase({});
    const promise = sut.create('any_customer', '2020-12-20', 'any_address', 'any_dest_address');
    expect(promise).rejects.toThrow();
  });

  test('Should throw if no DeliveryRepository is provided on load', async () => {
    const sut = new DeliveryUseCase();
    const promise = sut.load();
    expect(promise).rejects.toThrow(new MissingParamError(['deliveryRepository']));
  });

  test('Should throw if DeliveryRepository has no load method', async () => {
    const sut = new DeliveryUseCase({});
    const promise = sut.load();
    expect(promise).rejects.toThrow();
  });
});
