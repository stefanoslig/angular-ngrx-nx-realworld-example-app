module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/article-list',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'article-list',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
