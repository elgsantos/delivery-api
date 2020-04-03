const request = require('supertest');
let app;

describe('JSON Parser Middleware', () => {
  beforeEach(() => {
    jest.resetModules();
    app = require('../config/app');
  });

  test('Should parse body as JSON', async () => {
    app.post('/test_json', (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test_json')
      .send({ customer: 'any_customer' })
      .expect({ customer: 'any_customer' });
  });
});
