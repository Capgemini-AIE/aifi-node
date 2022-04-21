'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'api/aifi',

  create: aifiMethod({
    method: 'POST',
    path: '/checkouts',
  }),
});
