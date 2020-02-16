module.exports = {
  name: 'conduit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/conduit',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
