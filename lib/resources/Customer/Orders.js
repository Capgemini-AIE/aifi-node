'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customer/v2/orders',

  list: aifiMethod({
    method: 'GET',
    path: '',
  }),

  retrieve: aifiMethod({
    method: 'GET',
    path: '/{orderId}',
  }),

  payment: aifiMethod({
    method: 'POST',
    path: '/{orderId}/payment',
  }),

  listDrafts: aifiMethod({
    method: 'GET',
    path: 'draft',
  }),

  retreiveDraft: aifiMethod({
    method: 'POST',
    path: '/draft/{draftOrderID}',
  }),
});
