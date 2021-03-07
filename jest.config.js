module.exports = {
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  moduleNameMapper: {
    '.*scss': '<rootDir>/src/test_setup/emptyObject.ts'
  },

  // Test spec file resolution pattern.
  testRegex: "(\.test)\.tsx?$",
};
