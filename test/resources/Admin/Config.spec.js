'use strict';

const aifi = require('../../../testUtils').getSpyableAifi();

const expect = require('chai').expect;

describe('Admin', () => {
  describe('Config Resource', () => {
    describe('retrieve', () => {
      it('Sends the correct request', () => {
        aifi.admin.config.retrieve();
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/config',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });
  });
});
