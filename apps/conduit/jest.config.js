module.exports = {
  name: 'conduit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/conduit',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
