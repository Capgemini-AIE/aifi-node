'use strict';

const aifi = require('../../../testUtils').getSpyableAifi();

const expect = require('chai').expect;

describe('Admin', () => {
  describe('Customers Resource', () => {
    describe('create', () => {
      it('Sends the correct request', () => {
        aifi.admin.customers.create({
          email: 'test@test.com',
          password: '123456789',
        });
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/api/admin/v2/customers',
          headers: {},
          data: {
            email: 'test@test.com',
            password: '123456789',
          },
          settings: {},
        });
      });
    });
  });
});
