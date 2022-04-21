'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customer/v2/entry-codes',

  create: aifiMethod({
    method: 'POST',
    path: '',
  }),
});
