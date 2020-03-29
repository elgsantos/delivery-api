module.exports = class InvalidParamError extends Error {
  constructor (errorParams) {
    super('Validation Error.');
    this.name = 'InvalidParamError';
    this.fields = errorParams;
  }
};
