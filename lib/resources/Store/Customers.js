'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'api/aifi',

  entered: aifiMethod({
    method: 'POST',
    path: '/customers/entered',
  }),

  walkedOut: aifiMethod({
    method: 'POST',
    path: '/customers/walked-out',
  }),
});
