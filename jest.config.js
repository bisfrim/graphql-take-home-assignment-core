module.exports = {
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', 'logs', 'server.js', 'test'],
  coverageReporters: ['json', 'text', 'text-summary', 'clover', 'lcov', 'html', 'json-summary'],
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
};
