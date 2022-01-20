'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/orders',

  list: aifiMethod({
    method: 'GET',
    path: '',
  }),

  create: aifiMethod({
    method: 'POST',
    path: '',
  }),

  retrieve: aifiMethod({
    method: 'GET',
    path: '/{orderId}',
  }),

  update: aifiMethod({
    method: 'PATCH',
    path: '/{orderId}',
  }),

  retryCheckout: aifiMethod({
    method: 'POST',
    path: '/{orderId}/retry',
  }),
});
