'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/stores',

  list: aifiMethod({
    method: 'GET',
    path: '',
  }),

  // Store status
  status: aifiMethod({
    method: 'GET',
    path: '/{storeId}/status',
  }),

  updateStatus: aifiMethod({
    method: 'PATCH',
    path: '/{storeId}/status',
  }),

  // Store cameras
  listCameras: aifiMethod({
    method: 'GET',
    path: '/{storeId}/cameras',
  }),

  retrieveCamera: aifiMethod({
    method: 'GET',
    path: '/{storeId}/cameras/{cameraId}',
  }),

  listGondolas: aifiMethod({
    method: 'GET',
    path: '/{storeId}/gondolas',
  }),

  retrieveGondola: aifiMethod({
    method: 'GET',
    path: '/{storeId}/gondolas/{gondolaId}',
  }),

  // Shelves
  listGondolaShelves: aifiMethod({
    method: 'GET',
    path: '/{storeId}/gondolas/{gondolaId}/shelves',
  }),

  retrieveShelfInventory: aifiMethod({
    method: 'GET',
    path: '/{storeId}/shelves/{shelfId}/inventory',
  }),

  // Gondola planogram
  retrieveGondolaPlanogram: aifiMethod({
    method: 'GET',
    path: '/{storeId}/planogram/{gondolaId}',
  }),

  updateGondolaPlanogram: aifiMethod({
    method: 'PUT',
    path: '/{storeId}/planogram/{gondolaId}',
  }),

  // Inventory
  updateShelfInventory: aifiMethod({
    method: 'PUT',
    path: '/{storeId}/shelves/{shelfId}/bins/{binIndex}/inventory',
  }),

  visitors: aifiMethod({
    method: 'GET',
    path: '/{storeId}/visitors-count',
  }),

  // Entry codes
  verifyEntryCode: aifiMethod({
    method: 'POST',
    path: '/{storeId}/entry/{entryId}/entry-codes/verify',
  }),

  verifyDeviceEntryCode: aifiMethod({
    method: 'POST',
    path: '/{storeId}/check-in/{checkInDeviceId}/entry-codes/verify',
  }),
});
