export default {
  clearMocks: true,
  coverageDirectory: '../coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  setupFilesAfterEnv: [
    './src/shared/domain/tests/validations.ts',
    './src/shared/domain/tests/jest.ts',
  ],
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  testTimeout: 30000,
};
