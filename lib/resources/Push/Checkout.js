'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  // which is correct basePath = null or include /checkout as basePath?
  basePath: null,

  retrieve: aifiMethod({
    method: 'POST',
    path: '/checkout',
  }),
});
