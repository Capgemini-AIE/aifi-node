'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'customers/v2/payments',

  create: aifiMethod({
    method: 'GET',
    path: '/methods/initialize',
  }),
});
