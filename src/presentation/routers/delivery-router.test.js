const DeliveryRouter = require('./delivery-router');
const MissingParamError = require('../helpers/missing-param-error');

const makeSut = () => {
  return new DeliveryRouter();
};

describe('Delivery Router', () => {
  test('Should return 400 if no customer is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['customer']));
  });

  test('Should return 400 if no startAddress is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['startAddress']));
  });

  test('Should return 400 if no destinationAddress is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['destinationAddress']));
  });

  test('Should return 400 if no deliveryDate is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        customer: 'Someone',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('Missing params.'));
    expect(httpResponse.body.fields).toEqual(expect.arrayContaining(['deliveryDate']));
  });

  test('Should return 500 if no httpRequest is provided', () => {
    const sut = makeSut();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });

  test('Should return 500 if no httpRequest has no body', () => {
    const sut = makeSut();
    const httpRequest = {};
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});
