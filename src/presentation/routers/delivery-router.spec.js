const DeliveryRouter = require('./delivery-router');
const { MissingParamError, ServerError } = require('../errors');

const makeDeliveryUseCaseWithError = () => {
  class DeliveryUseCaseSpy {
    async create () {
      throw new Error();
    }
  }
  return new DeliveryUseCaseSpy();
};

const makeDeliveryUseCase = () => {
  class DeliveryUseCaseSpy {
    async create (customer, deliveryDate, startAddress, destinationAddress) {
      this.customer = customer;
      this.deliveryDate = deliveryDate;
      this.startAddress = startAddress;
      this.destinationAddress = destinationAddress;
    }
  }
  const deliveryUseCaseSpy = new DeliveryUseCaseSpy();
  return deliveryUseCaseSpy;
};

const makeSut = () => {
  const deliveryUseCase = makeDeliveryUseCase();
  const sut = new DeliveryRouter(deliveryUseCase);
  return {
    sut,
    deliveryUseCase
  };
};

const makeValidHttpRequest = () => {
  return {
    body: {
      customer: 'Someone',
      deliveryDate: '2010-01-01',
      startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
      destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ',
      startLocation: { lat: -22.8938698, lng: -43.1235658 },
      destinationLocation: { lat: -22.906872, lng: -43.114219 }
    }
  };
};

describe('Delivery Router', () => {
  test('Should return 400 if no customer is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.customer;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['customer']));
  });

  test('Should return 400 if no startAddress is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.startAddress;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['startAddress']));
  });

  test('Should return 400 if no destinationAddress is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.destinationAddress;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['destinationAddress']));
  });

  test('Should return 400 if no deliveryDate is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.deliveryDate;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['deliveryDate']));
  });

  test('Should return 400 if no startLocation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.startLocation;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['startLocation']));
  });

  test('Should return 400 if no startLocation.lat is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.startLocation.lat;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['startLocation']));
  });

  test('Should return 400 if no startLocation.lng is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.startLocation.lng;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['startLocation']));
  });

  test('Should return 400 if no destinationLocation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.destinationLocation;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['destinationLocation']));
  });

  test('Should return 400 if no destinationLocation.lat is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.destinationLocation.lat;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['destinationLocation']));
  });

  test('Should return 400 if no destinationLocation.lng is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();

    delete httpRequest.body.destinationLocation.lng;
    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError());
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['destinationLocation']));
  });

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if no httpRequest has no body', async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if no DeliveryUseCase is provided', async () => {
    const sut = new DeliveryRouter();
    const httpRequest = makeValidHttpRequest();

    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if DeliveryUseCase has no create method', async () => {
    class DeliveryUseCaseSpy { }
    const deliveryUseCaseSpy = new DeliveryUseCaseSpy();
    const sut = new DeliveryRouter(deliveryUseCaseSpy);
    const httpRequest = makeValidHttpRequest();

    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if DeliveryUseCase throws', async () => {
    const deliveryUseCaseSpy = makeDeliveryUseCaseWithError();
    const sut = new DeliveryRouter(deliveryUseCaseSpy);
    const httpRequest = makeValidHttpRequest();

    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  test('Should call DeliveryUseCase with correct params', async () => {
    const { sut, deliveryUseCase } = makeSut();
    const httpRequest = makeValidHttpRequest();

    await sut.route(httpRequest);
    expect(deliveryUseCase.customer).toEqual(httpRequest.body.customer);
    expect(deliveryUseCase.deliveryDate).toBe(httpRequest.body.deliveryDate);
    expect(deliveryUseCase.startAddress).toBe(httpRequest.body.startAddress);
    expect(deliveryUseCase.destinationAddress).toBe(httpRequest.body.destinationAddress);
  });

  test('Should return 200 when delivery is created', async () => {
    const { sut } = makeSut();
    const httpRequest = makeValidHttpRequest();
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
