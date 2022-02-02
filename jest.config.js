module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 20000,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js"
      ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
      },
    globals: {
        "ts-jest": {
          "tsConfig": "tsconfig.json"
        }
      },
    testMatch: [
        "**/tests/*-test.ts"
      ]
  };
  