export default {
  displayName: {
    name: 'apollo',
    color: 'purple',
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
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '@me\\-mudei/core/(.*)$':
      '<rootDir>/../../../node_modules/@me-mudei/core/dist/$1',
    '#shared/(.*)$':
      '<rootDir>/../../../node_modules/@me-mudei/core/dist/shared/$1',
    '#user/(.*)$':
      '<rootDir>/../../../node_modules/@me-mudei/core/dist/user/$1',
    '#property/(.*)$':
      '<rootDir>/../../../node_modules/@me-mudei/core/dist/property/$1',
  },
  setupFilesAfterEnv: ['../../core/src/shared/domain/tests/jest.ts'],
};
