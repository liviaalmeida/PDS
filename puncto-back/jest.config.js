module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "./out/**/*",
  //   "!**/node_modules/**",
  //   "!**/vendor/**"
  // ],
  testMatch: [
    '<rootDir>/src/**/*.unit.test.ts',
  ],
  testPathIgnorePatterns: ["<rootDir>/config/", "<rootDir>/node_modules/"]
};

