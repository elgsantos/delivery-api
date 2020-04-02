module.exports = {
  // Stop running tests after `n` failures
  bail: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['**/src/**/*.js'],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // The test environment that will be used for testing
  // testEnvironment: 'node'
  preset: '@shelf/jest-mongodb'
};
