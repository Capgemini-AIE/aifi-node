'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/stores',

  create: aifiMethod({
    method: 'POST',
    path: '/{storeId}/tasks/check',
  }),
});
