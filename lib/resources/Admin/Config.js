'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/config',

  retrieve: aifiMethod({
    method: 'GET',
    path: '',
  }),
});
