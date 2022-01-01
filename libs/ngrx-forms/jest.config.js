module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/ngrx-forms',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'ngrx-forms',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
