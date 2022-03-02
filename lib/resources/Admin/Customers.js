'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/customers',

  create: aifiMethod({
    method: 'POST',
    path: '',
  }),

  retrieve: aifiMethod({
    method: 'GET',
    path: '/{customerId}',
  }),

  list: aifiMethod({
    method: 'GET',
    path: '',
  }),

  update: aifiMethod({
    method: 'PATCH',
    path: '/{customerId}',
  }),

  createEntryCode: aifiMethod({
    method: 'POST',
    path: '/{customerId}/entry-codes',
  }),
});
