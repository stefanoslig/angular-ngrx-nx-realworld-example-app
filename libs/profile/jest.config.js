module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/profile',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'profile',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
