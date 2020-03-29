module.exports = class InvalidParamError extends Error {
  constructor (message, errorParams) {
    super(message);
    this.name = 'InvalidParamError';
    this.fields = errorParams;
  }
};
