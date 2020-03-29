const MissingParamError = require('./missing-param-error');
const InvalidParamError = require('./invalid-param-error');

module.exports = class HttpResponse {
  static badRequest (errorParams) {
    return {
      statusCode: 400,
      body: new MissingParamError('Missing params.', errorParams)
    };
  }

  static serverError () {
    return {
      statusCode: 500
    };
  }

  static unprocessableRequest (errorParams) {
    return {
      statusCode: 422,
      body: new InvalidParamError('Validation Error.', errorParams)
    };
  }
};
