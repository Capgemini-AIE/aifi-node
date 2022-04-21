'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customer/v2/products',

  search: aifiMethod({
    method: 'GET',
    path: '',
  }),
});
