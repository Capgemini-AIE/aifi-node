return {
  autoDetect: true,
  files: [
    'package.json', // IMPORTANT
  ],

  tests: ['test/**/*Spec.js', 'test/**/*test.js'],

  trace: true,

  env: {
    type: 'node',
  },

  symlinkNodeModules: true, // can be removed if `package.json` contains `"type": "module"`

  workers: {restart: true}, // IMPORTANT
};
