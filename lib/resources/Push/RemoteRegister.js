'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  basePath: null,

  create: aifiMethod({
    method: 'POST',
    path: '/remote-register',
  }),
});
