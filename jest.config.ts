const config = {
  preset: '@shelf/jest-mongodb',
  verbose: true,
  collectCoverage: false,
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
  // setupFiles: ['<rootDir>/jest.setup.ts'],
};
module.exports = config;
