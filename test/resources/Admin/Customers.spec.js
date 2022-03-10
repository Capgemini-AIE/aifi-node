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

    describe('retrieve', () => {
      it('Sends the correct request', () => {
        aifi.admin.customers.retrieve('1');
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/customers/1',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });

    describe('list', () => {
      it('Sends the correct request', () => {
        aifi.admin.customers.list({externalId: 25});
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/customers?externalId=25',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });

    describe('update', () => {
      it('Sends the correct request', () => {
        aifi.admin.customers.update('1', {
          email: 'john.doe5@gmail.com',
          password: 'new-hard-to-guess',
          currentPassword: 'hard-to-guess',
          firstName: 'John',
          lastName: 'Doe',
          phone: '15412334363',
          card: {
            provider: 'STRIPE',
            cardToken: 'E67TY8GQ27X',
            defaultCard: false,
          },
        });
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'PATCH',
          url: '/api/admin/v2/customers/1',
          headers: {},
          data: {
            email: 'john.doe5@gmail.com',
            password: 'new-hard-to-guess',
            currentPassword: 'hard-to-guess',
            firstName: 'John',
            lastName: 'Doe',
            phone: '15412334363',
            card: {
              provider: 'STRIPE',
              cardToken: 'E67TY8GQ27X',
              defaultCard: false,
            },
          },
          settings: {},
        });
      });
    });
    describe('createEntryCode', () => {
      it('Sends the correct request', () => {
        aifi.admin.customers.createEntryCode('1');
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/api/admin/v2/customers/1/entry-codes',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });
  });
});
