'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: '/checkout_zone',

  entered: aifiMethod({
    method: 'POST',
    path: '/entered',
  }),

  left: aifiMethod({
    method: 'POST',
    path: '/left',
  }),
});
