'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customers/v2/orders',

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

  listDraft: aifiMethod({
    method: 'PATCH',
    path: 'draft',
  }),

  retreiveDraft: aifiMethod({
    method: 'POST',
    path: '/draft/{draftOrderID}',
  }),
});
