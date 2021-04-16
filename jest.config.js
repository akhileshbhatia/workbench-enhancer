module.exports = {
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],

  moduleNameMapper: {
    '.*scss': '<rootDir>/src/test/emptyObject.ts'
  },

  // Test spec file resolution pattern.
  testRegex: "(\.test)\.tsx?$",
};
