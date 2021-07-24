module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "./out/**/*",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  testPathIgnorePatterns: ["<rootDir>/config/", "<rootDir>/node_modules/"]
};