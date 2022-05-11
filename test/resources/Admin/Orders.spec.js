'use strict';

const aifi = require('../../../testUtils').getSpyableAifi();

const expect = require('chai').expect;

describe('Admin', () => {
  describe('Orders Resource', () => {
    describe('create', () => {
      it('Sends the correct request', () => {
        aifi.admin.orders.create({
          customerId: 1,
          customerShoppingSessionId: 1,
          externalId: '84a2c287e621474c98e7ee517c422116',
          status: 'draft',
          storeId: 1,
          transactionId: 1,
          products: [
            {
              id: 28587028316208,
              quantity: 5,
            },
          ],
        });
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/api/admin/v2/orders',
          headers: {},
          data: {
            customerId: 1,
            customerShoppingSessionId: 1,
            externalId: '84a2c287e621474c98e7ee517c422116',
            status: 'draft',
            storeId: 1,
            transactionId: 1,
            products: [
              {
                id: 28587028316208,
                quantity: 5,
              },
            ],
          },
          settings: {},
        });
      });
    });

    describe('retrieve', () => {
      it('Sends the correct request', () => {
        aifi.admin.orders.retrieve('1');
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/orders/1',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });

    describe('list', () => {
      it('Sends the correct request', () => {
        aifi.admin.orders.list({externalId: 25});
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/orders?externalId=25',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });

    describe('update', () => {
      it('Sends the correct request', () => {
        aifi.admin.orders.update('1', {
          customerId: 1,
          customerShoppingSessionId: 1,
          externalId: '84a2c287e621474c98e7ee517c422116',
          status: 'draft',
          storeId: 1,
          transactionId: 1,
          products: [
            {
              id: 28587028316208,
              quantity: 5,
            },
          ],
        });
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'PATCH',
          url: '/api/admin/v2/orders/1',
          headers: {},
          data: {
            customerId: 1,
            customerShoppingSessionId: 1,
            externalId: '84a2c287e621474c98e7ee517c422116',
            status: 'draft',
            storeId: 1,
            transactionId: 1,
            products: [
              {
                id: 28587028316208,
                quantity: 5,
              },
            ],
          },
          settings: {},
        });
      });
    });

    describe('retryCheckout', () => {
      it('Sends the correct request', () => {
        aifi.admin.orders.retryCheckout('1');
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/api/admin/v2/orders/1/retry',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });
  });
});
