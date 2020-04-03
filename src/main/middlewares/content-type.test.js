const request = require('supertest');
let app;

describe('Content-Type Middleware', () => {
  beforeEach(() => {
    jest.resetModules();
    app = require('../config/app');
  });

  test('Should return json content-type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({});
    });

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/);
  });
});
