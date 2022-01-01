module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/ngrx-router',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'ngrx-router',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
