'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customer/v2/sessions',

  login: aifiMethod({
    method: 'POST',
    path: '',
  }),

  delete: aifiMethod({
    method: 'DELETE',
    path: '/{customerId}',
  }),

  refresh: aifiMethod({
    method: 'POST',
    path: '/refresh',
  }),
});
