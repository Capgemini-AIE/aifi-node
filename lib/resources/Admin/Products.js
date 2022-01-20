'use strict';

const AifiResource = require('../../AifiResource');
const aifiMethod = AifiResource.method;

module.exports = AifiResource.extend({
  path: 'admin/v2/products',

  list: aifiMethod({
    method: 'GET',
    path: '',
  }),

  // Uses externalId vs productId to update the product.
  upsert: aifiMethod({
    method: 'PUT',
    path: '',
  }),

  listCategories: aifiMethod({
    method: 'GET',
    path: '/categories',
  }),

  listSnapshots: aifiMethod({
    method: 'GET',
    path: '/snapshots',
  }),

  create: aifiMethod({
    method: 'POST',
    path: '',
  }),

  retrieve: aifiMethod({
    method: 'GET',
    path: '/{productId}',
  }),

  update: aifiMethod({
    method: 'PUT',
    path: '/{productId}',
  }),

  delete: aifiMethod({
    method: 'DELETE',
    path: '/{productId}',
  }),

  retrievePlanogram: aifiMethod({
    method: 'GET',
    path: '/{productId}/planogram',
  }),

  // Product Variants
  listVariants: aifiMethod({
    method: 'GET',
    path: '/variants',
  }),

  retrieveDefaultVariant: aifiMethod({
    method: 'GET',
    path: '/{productId}/variants/default',
  }),

  createVariant: aifiMethod({
    method: 'POST',
    path: '/variants/{variantId}',
  }),

  retrieveVariant: aifiMethod({
    method: 'GET',
    path: '/variants/{variantId}',
  }),

  deleteVariant: aifiMethod({
    method: 'DELETE',
    path: '/variants/{variantId}',
  }),

  updateVariant: aifiMethod({
    method: 'PATCH',
    path: '/variants/{variantId}',
  }),

  // Variant barcodes
  createVariantBarcode: aifiMethod({
    method: 'POST',
    path: '/variants/{variantId}/barcodes',
  }),

  deleteVariantBarcode: aifiMethod({
    method: 'DELETE',
    path: '/variants/{variantId}/barcodes',
  }),
});
