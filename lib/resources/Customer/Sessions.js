'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customer/v2/sessions',

  loginSession: aifiMethod({
    method: 'POST',
    path: '',
  }),

  deleteSessoin: aifiMethod({
    method: 'DELETE',
    path: '/{customerId}',
  }),

  refreshSession: aifiMethod({
    method: 'POST',
    path: '/refresh',
  }),
});
