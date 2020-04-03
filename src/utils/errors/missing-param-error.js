module.exports = class MissingParamError extends Error {
  constructor (errorParams) {
    super('Missing params.');
    this.name = 'MissingParamError';
    this.fields = errorParams;
  }
};
