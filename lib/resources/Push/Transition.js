'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: '/transitions',

  entered: aifiMethod({
    method: 'POST',
    path: '/entered',
  }),

  left: aifiMethod({
    method: 'POST',
    path: '/left',
  }),
});
