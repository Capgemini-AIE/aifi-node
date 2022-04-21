'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'api/aifi',

  entered: aifiMethod({
    method: 'POST',
    path: '/checkout_zone/entered',
  }),

  walkedOut: aifiMethod({
    method: 'POST',
    path: '/checkout_zone/left',
  }),
});
