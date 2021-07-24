module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.integration.test.ts',
  ],
  moduleFileExtensions: ['ts', 'js'],
};