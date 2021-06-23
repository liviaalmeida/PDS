module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "./out/**/*",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};