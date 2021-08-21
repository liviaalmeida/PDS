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
    '/^@\\/(.*)$/': 'C:\\Users\\leave\\Repos\\PDS\\puncto-front\\src\\$1',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  resolver: null,
  testMatch: ['C:\\Users\\leave\\Repos\\PDS\\puncto-front\\tests\\**\\*.spec.js?(x)'],
  transform: {
    '^.+\\.svg$': 'C:\\Users\\leave\\Repos\\PDS\\puncto-front\\tests\\tools\\svgTransform.js',
  },
}
