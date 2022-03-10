'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'api/aifi',

  verify: aifiMethod({
    method: 'POST',
    path: '/entry-codes/verify',
  }),
});
