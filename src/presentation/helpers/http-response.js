const MissingParamError = require('./missing-param-error');

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
};
