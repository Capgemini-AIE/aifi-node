'use strict';

const aifi = require('../../../testUtils').getSpyableAifi();

const expect = require('chai').expect;

describe('Admin', () => {
  describe('Contests Resource', () => {
    describe('create', () => {
      it('Sends the correct request', () => {
        aifi.admin.contests.create({
          productId: 1,
          quantity: 1,
          items: [],
        });
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/api/admin/v2/contests',
          headers: {},
          data: {
            productId: 1,
            quantity: 1,
            items: [],
          },
          settings: {},
        });
      });
    });

    describe('retrieve', () => {
      it('Sends the correct request', () => {
        aifi.admin.contests.retrieve('1');
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/contests/1',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });

    describe('list', () => {
      it('Sends the correct request', () => {
        aifi.admin.contests.list();
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/admin/v2/contests',
          headers: {},
          data: {},
          settings: {},
        });
      });
    });

    describe('update', () => {
      it('Sends the correct request', () => {
        aifi.admin.contests.update('1', {
          items: [
            {
              productId: 1,
              reviewedQuantity: 1,
            },
          ],
          reviewedTotalPrice: 1,
        });
        expect(aifi.LAST_REQUEST).to.deep.equal({
          method: 'PATCH',
          url: '/api/admin/v2/contests/1',
          headers: {},
          data: {
            items: [
              {
                productId: 1,
                reviewedQuantity: 1,
              },
            ],
            reviewedTotalPrice: 1,
          },
          settings: {},
        });
      });
    });
  });
});
