'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: '/health',

  retrieve: aifiMethod({
    method: 'GET',
    path: '/pos',
  }),
});
