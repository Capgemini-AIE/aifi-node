'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customers/v2/products',

  retrieve: aifiMethod({
    method: 'GET',
    path: '',
  }),
});
