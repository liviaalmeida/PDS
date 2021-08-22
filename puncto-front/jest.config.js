module.exports = {
  collectCoverage: true,
  coverageReporters: ['text-summary'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 70,
      lines: 80,
    },
  },
  moduleNameMapper: {
    '/^@\\/(.*)$/': '<rootDir>\\src\\$1',
    '^.+/(.*\\.svg)\\?inline$': '<rootDir>\\src\\assets\\icons\\$1',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  resolver: null,
  testMatch: ['<rootDir>\\tests\\**\\*.spec.js?(x)'],
  transform: {
    '^.+\\.svg$': '<rootDir>\\tests\\tools\\svgTransform.js',
  },
}
