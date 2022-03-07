'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'api/aifi',

  update: aifiMethod({
    method: 'PUT',
    path: '/products/{productId}',
  }),
});
