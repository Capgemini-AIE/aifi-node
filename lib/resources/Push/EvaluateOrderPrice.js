'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  basePath: null,

  retrieve: aifiMethod({
    method: 'POST',
    path: '/order-price',
  }),
});
