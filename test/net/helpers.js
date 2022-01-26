'use strict';

const nock = require('nock');
const expect = require('chai').expect;

const utils = require('../../lib/utils');
const {fail} = require('assert');

/**
 * Test runner which runs a common set of tests for a given HTTP client to make
 * sure the client meets the interface expectations.
 *
 * This takes in a function to create the client.
 *
 * This can be configured to run extra tests, providing the nock setup function
 * and request function for those tests.
 */
const createHttpClientTestSuite = (createHttpClientFn, extraTestsFn) => {
  describe('HttpClientTestSuite', () => {
    const setupNock = () => {
      return nock('http://aifi.io').get('/test');
    };

    const sendRequest = (options) => {
      options = options || {};
      return createHttpClientFn().makeRequest(
        'aifi.io',
        options.port || 80,
        '/test',
        options.method || 'GET',
        options.headers || {},
        options.requestData,
        'http',
        options.timeout || 1000
      );
    };

    afterEach(() => {
      nock.cleanAll();
    });

    describe('makeRequest', () => {
      it('rejects with a timeout error', async () => {
        setupNock().delayConnection(31).reply(200, 'hello, world!');

        try {
          await sendRequest({timeout: 30});
          fail();
        } catch (e) {
          expect(e.code).to.be.equal('ETIMEDOUT');
        }
      });

      it('forwards any error', async () => {
        setupNock().replyWithError('sample error');

        try {
          await sendRequest();
          fail();
        } catch (e) {
          expect(e.message).to.contain('sample error');
        }
      });

      it('sends request headers', async () => {
        nock('http://aifi.io', {
          reqheaders: {
            sample: 'value',
          },
        })
          .get('/test')
          .reply(200);

        await sendRequest({headers: {sample: 'value'}});
      });

      it('sends request data (POST)', (done) => {
        const expectedData = utils.stringifyRequestData({id: 'test'});

        nock('http://aifi.io')
          .post('/test')
          .reply(200, (uri, requestBody) => {
            expect(requestBody).to.equal(expectedData);
            done();
          });

        sendRequest({method: 'POST', requestData: expectedData});
      });

      it('custom port', async () => {
        nock('http://aifi.io:1234').get('/test').reply(200);
        await sendRequest({port: 1234});
      });

      describe('NodeHttpClientResponse', () => {
        it('getStatusCode()', async () => {
          setupNock().reply(418, 'hello, world!');

          const response = await sendRequest();

          expect(response.getStatusCode()).to.be.equal(418);
        });

        it('getHeaders()', async () => {
          setupNock().reply(200, 'hello, world!', {
            'X-Header-1': '123',
            'X-Header-2': 'test',
          });

          const response = await sendRequest();

          // Headers get transformed into lower case.
          expect(response.getHeaders()).to.be.deep.equal({
            'x-header-1': '123',
            'x-header-2': 'test',
          });
        });

        it('toJSON throws when JSON parsing fails', async () => {
          setupNock().reply(200, '{"a');

          const response = await sendRequest();

          try {
            await response.toJSON();
            fail();
          } catch (e) {
            expect(e.message).to.contain('Unexpected end of JSON input');
          }
        });
      });
    });

    extraTestsFn(setupNock, sendRequest);
  });
};

module.exports = {createHttpClientTestSuite};
