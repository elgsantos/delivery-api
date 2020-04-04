const request = require('supertest');
const app = require('../config/app');
const MongoHelper = require('../../infra/helpers/mongo-helper');
let deliveryModel;

describe('Delivery Routes', () => {
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

  test('Should return 200 when delivery is created', async () => {
    await request(app)
      .post('/api/deliveries')
      .send({
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125',
        destinationAddress: 'Rua Lopes Trovão, 10 - Icaraí, Niterói -RJ'
      })
      .expect(200);
  });

  test('Should return 400 when param is missing', async () => {
    await request(app)
      .post('/api/deliveries')
      .send({
        customer: 'Someone',
        deliveryDate: '2010-01-01',
        startAddress: 'Rua Quinze de Novembro, 8 - Centro, Niterói - RJ, 24020-125'
      })
      .expect(400);
  });
});
