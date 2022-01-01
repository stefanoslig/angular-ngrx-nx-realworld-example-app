module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/settings',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'settings',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
