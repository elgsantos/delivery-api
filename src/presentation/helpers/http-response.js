const MissingParamError = require('./missing-param-error');
const InvalidParamError = require('./invalid-param-error');
const ServerError = require('./server-error');

module.exports = class HttpResponse {
  static badRequest (errorParams) {
    return {
      statusCode: 400,
      body: new MissingParamError(errorParams)
    };
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    };
  }

  static unprocessableRequest (errorParams) {
    return {
      statusCode: 422,
      body: new InvalidParamError(errorParams)
    };
  }

  static ok (data) {
    return {
      statusCode: 200,
      body: data
    };
  }
};
