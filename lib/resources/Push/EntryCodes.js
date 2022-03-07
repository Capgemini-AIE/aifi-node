'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: '/entry-codes',

  verify: aifiMethod({
    method: 'POST',
    path: '/verify',
  }),
});
