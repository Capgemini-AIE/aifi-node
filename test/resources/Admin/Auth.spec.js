'use strict';

const aifi = require('../../../testUtils').getSpyableAifi();

const expect = require('chai').expect;

describe('Admin', () => {
  describe('Auth Resource', () => {
    describe('retrieveToken', () => {
      it('Sends the correct request', () => {
        // hmac, shop & locale are required query params on this API req
        aifi.admin.auth.retrieveToken({
          hmac: '123',
          shop: 'nanostore-beta.myshopify.com',
          timestamp: '1555685958',
          locale: 'pl',
        });
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/auth/token?hmac=123&shop=nanostore-beta.myshopify.com&timestamp=1555685958&locale=pl',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });
  });
});
