// const GetDeliveriesRouter = require('./delivery-router');
const { ServerError } = require('../../utils/errors');
const { StringToDate } = require('../helpers/date-converter');
const GetDeliveriesRouter = require('../routers/get-deliveries-router');

const makeDeliveryUseCaseWithError = () => {
  class DeliveryUseCaseSpy {
    async load () {
      throw new Error();
    }
  }
  return new DeliveryUseCaseSpy();
};

const makeDeliveryUseCase = () => {
  class DeliveryUseCaseSpy {
    async load () {
      return this.deliveries;
    }
  }
  const deliveryUseCaseSpy = new DeliveryUseCaseSpy();
  deliveryUseCaseSpy.deliveries = [];
  return deliveryUseCaseSpy;
};

const makeSut = () => {
  const deliveryUseCase = makeDeliveryUseCase();
  const sut = new GetDeliveriesRouter(deliveryUseCase);
  return {
    sut,
    deliveryUseCase
  };
};

const makeValidDelivery = () => {
  return {
    _id: '1',
    customer: 'Someone',
    deliveryDate: StringToDate('2010-01-01'),
    startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
    destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
  };
};

describe('Get Deliveries Router', () => {
  test('Should return 500 if no DeliveryUseCase is provided', async () => {
    const sut = new GetDeliveriesRouter();

    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if DeliveryUseCase has no method', async () => {
    class DeliveryUseCaseSpy { }
    const deliveryUseCaseSpy = new DeliveryUseCaseSpy();
    const sut = new GetDeliveriesRouter(deliveryUseCaseSpy);

    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if DeliveryUseCase throws', async () => {
    const deliveryUseCaseSpy = makeDeliveryUseCaseWithError();
    const sut = new GetDeliveriesRouter(deliveryUseCaseSpy);

    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });

  test('Should return 200 when delivery is created', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(200);
  });

  test('Should return empty array if useCase finds no delivery', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([]);
  });

  test('Should return a list with valid deliveries if any is found', async () => {
    const { sut, deliveryUseCase } = makeSut();
    deliveryUseCase.deliveries = [makeValidDelivery()];

    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([
      makeValidDelivery()
    ]);
  });
});
