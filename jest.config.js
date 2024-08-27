module.exports = {
  preset: 'react-native',

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  jest: {
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
  },
};
