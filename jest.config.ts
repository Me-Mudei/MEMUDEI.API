export default {
  clearMocks: true,
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: [
    "/dist/",
    "/coverage/",
    "/prisma/",
    "/*.config.ts",
    "/.eslintrc.js",
  ],
  testTimeout: 30000,
  setupFilesAfterEnv: [
    "./src/shared/domain/tests/validations.ts",
    "./src/shared/domain/tests/jest.ts",
  ],
};
