module.exports = class MissingParamError extends Error {
  constructor (message, errorParams) {
    super(message);
    this.name = 'MissingParamError';
    this.fields = errorParams;
  }
};
