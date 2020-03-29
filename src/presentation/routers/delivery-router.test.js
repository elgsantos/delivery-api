const DeliveryRouter = require('./delivery-router');
const MissingParamError = require('../helpers/missing-param-error');
const ServerError = require('../helpers/server-error');
const InvalidParamError = require('../helpers/invalid-param-error');

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
  return new DeliveryUseCaseSpy();
};

const makeSut = () => {
  const deliveryUseCase = makeDeliveryUseCase();
  const sut = new DeliveryRouter(deliveryUseCase);
  return {
    sut,
    deliveryUseCase
  };
};

describe('Delivery Router', () => {
  test('Should return 400 if no customer is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['customer']));
  });

  test('Should return 400 if no startAddress is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['startAddress']));
  });

  test('Should return 400 if no destinationAddress is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['destinationAddress']));
  });

  test('Should return 400 if no deliveryDate is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['deliveryDate']));
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
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if DeliveryUseCase has no create method', async () => {
    class DeliveryUseCaseSpy { }
    const deliveryUseCaseSpy = new DeliveryUseCaseSpy();
    const sut = new DeliveryRouter(deliveryUseCaseSpy);
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if DeliveryUseCase throws', async () => {
    const deliveryUseCaseSpy = makeDeliveryUseCaseWithError();
    const sut = new DeliveryRouter(deliveryUseCaseSpy);
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  test('Should call DeliveryUseCase with correct params', async () => {
    const { sut, deliveryUseCase } = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    await sut.route(httpRequest);
    expect(deliveryUseCase.customer).toBe(httpRequest.body.customer);
    expect(deliveryUseCase.deliveryDate).toBe(httpRequest.body.deliveryDate);
    expect(deliveryUseCase.startAddress).toBe(httpRequest.body.startAddress);
    expect(deliveryUseCase.destinationAddress).toBe(httpRequest.body.destinationAddress);
  });

  test('Should return 422 if startAddress or destinationAddress is not found', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual(new InvalidParamError());
  });
});
