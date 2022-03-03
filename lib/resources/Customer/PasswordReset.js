'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customer/v2/password-reset',

  reset: aifiMethod({
    method: 'POST',
    path: '',
  }),

  set: aifiMethod({
    method: 'PATCH',
    path: '',
  }),

  verify: aifiMethod({
    method: 'POST',
    path: '/verify',
  }),
});
