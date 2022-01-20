'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/auth',

  retrieveToken: aifiMethod({
    method: 'GET',
    path: '/token',
  }),
});
