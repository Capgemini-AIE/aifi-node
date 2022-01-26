'use strict';

const http = require('http');
const expect = require('chai').expect;

const {createNodeHttpClient} = require('../../lib/aifi');

const {createHttpClientTestSuite} = require('./helpers');

describe('NodeHttpClient', () => {
  createHttpClientTestSuite(createNodeHttpClient, (setupNock, sendRequest) => {
    describe('raw stream', () => {
      it('getRawResponse()', async () => {
        setupNock().reply(200);

        const response = await sendRequest();

        expect(response.getRawResponse()).to.be.an.instanceOf(
          http.IncomingMessage
        );
      });
    });
  });
});
