export default {
  displayName: {
    name: 'core',
    color: 'blue',
  },
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
  rootDir: 'src',
  setupFilesAfterEnv: [
    './shared/domain/tests/validations.ts',
    './shared/domain/tests/jest.ts',
  ],
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  testTimeout: 30000,
};
