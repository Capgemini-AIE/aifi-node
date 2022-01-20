'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/sessions',

  list: aifiMethod({
    method: 'GET',
    path: '',
  }),

  updateCart: aifiMethod({
    method: 'PUT',
    path: '/{sessionId}/cart',
  }),

  checkout: aifiMethod({
    method: 'POST',
    path: '/{sessionId}/checkout',
  }),
});
