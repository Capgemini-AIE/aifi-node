'use strict';

const expect = require('chai').expect;
const fetch = require('node-fetch');
const {FetchHttpClient} = require('../../lib/net/FetchHttpClient');

const createFetchHttpClient = () => {
  return new FetchHttpClient(fetch);
};

const {createHttpClientTestSuite} = require('./helpers');

describe('FetchHttpClient', () => {
  createHttpClientTestSuite(createFetchHttpClient, (setupNock, sendRequest) => {
    describe('raw stream', () => {
      it('getRawResponse()', async () => {
        setupNock().reply(200);
        const response = await sendRequest();
        expect(response.getRawResponse()).to.be.an.instanceOf(fetch.Response);
      });
    });
  });
});
