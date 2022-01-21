'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));

const http = require('http');

const ResourceNamespace = require('../lib/ResourceNamespace').ResourceNamespace;

const testingHttpAgent = new http.Agent({keepAlive: false});

const utils = (module.exports = {
  getTestServerAifi: (clientOptions, handler, callback) => {
    const server = http.createServer((req, res) => {
      const {shouldStayOpen} = handler(req, res) || {};
      if (!shouldStayOpen) {
        res.on('close', () => {
          server.close();
        });
      }
    });
    server.listen(0, () => {
      const {port} = server.address();
      const aifi = require('../lib/aifi')(
        module.exports.getUserAifiKey(),
        {
          host: 'localhost',
          port,
          protocol: 'http',
          httpAgent: testingHttpAgent,
          ...clientOptions,
        }
      );
      return callback(null, aifi, () => {
        server.close();
      });
    });
  },

  getAifiMockClient: () => {
    const aifi = require('../lib/aifi');

    return aifi('sk_test_123', {
      host: process.env.AIFI_MOCK_HOST || 'localhost',
      port: process.env.AIFI_MOCK_PORT || 12111,
      protocol: 'http',
    });
  },

  getUserAifiKey: () => {
    const key =
      process.env.AIFI_TEST_API_KEY || 'tGN0bIwXnHdwOa85VABjPdSn8nWY7G7I';

    return key;
  },

  getSpyableAifi: () => {
    // Provide a testable aifi instance
    // That is, with mock-requests built in and hookable

    const aifi = require('../lib/aifi');
    const aifiInstance = aifi('fakeAuthToken');

    aifiInstance.REQUESTS = [];

    for (const i in aifiInstance) {
      makeInstanceSpyable(aifiInstance, aifiInstance[i]);
    }

    function makeInstanceSpyable(aifiInstance, thisInstance) {
      if (thisInstance instanceof aifi.AifiResource) {
        patchRequest(aifiInstance, thisInstance);
      } else if (thisInstance instanceof ResourceNamespace) {
        const namespace = thisInstance;

        for (const j in namespace) {
          makeInstanceSpyable(aifiInstance, namespace[j]);
        }
      }
    }

    function patchRequest(aifiInstance, instance) {
      instance._request = function(method, host, url, data, auth, options, cb) {
        const req = (aifiInstance.LAST_REQUEST = {
          method,
          url,
          data,
          headers: options.headers || {},
          settings: options.settings || {},
        });
        if (auth) {
          req.auth = auth;
        }
        if (host) {
          req.host = host;
        }

        const handleMockRequest = (err, req) => {
          aifiInstance.REQUESTS.push(req);
          cb.call(this, err, {});
        };

        if (this.requestDataProcessor) {
          this.requestDataProcessor(
            method,
            data,
            options.headers,
            handleMockRequest
          );
        } else {
          handleMockRequest(null, req);
        }
      };
    }

    return aifiInstance;
  },

  /**
   * A utility where cleanup functions can be registered to be called post-spec.
   * CleanupUtility will automatically register on the mocha afterEach hook,
   * ensuring its called after each descendent-describe block.
   */
  CleanupUtility: (() => {
    CleanupUtility.DEFAULT_TIMEOUT = 20000;

    function CleanupUtility(timeout) {
      const self = this;
      this._cleanupFns = [];
      this._aifi = require('../lib/aifi')(
        utils.getUserAifiKey(),
        'latest'
      );
      afterEach(function(done) {
        this.timeout(timeout || CleanupUtility.DEFAULT_TIMEOUT);
        return self.doCleanup(done);
      });
    }

    CleanupUtility.prototype = {
      doCleanup(done) {
        const cleanups = this._cleanupFns;
        const total = cleanups.length;
        let completed = 0;
        let fn;
        while ((fn = cleanups.shift())) {
          const promise = fn.call(this);
          if (!promise || !promise.then) {
            throw new Error(
              'CleanupUtility expects cleanup functions to return promises!'
            );
          }
          promise.then(
            () => {
              // cleanup successful
              completed += 1;
              if (completed === total) {
                done();
              }
            },
            (err) => {
              // not successful
              throw err;
            }
          );
        }
        if (total === 0) {
          done();
        }
      },
      add(fn) {
        this._cleanupFns.push(fn);
      },
      deleteCustomer(custId) {
        this.add(function() {
          return this._aifi.customers.del(custId);
        });
      },
    };

    return CleanupUtility;
  })(),

  /**
   * Get a random string for test Object creation
   */
  getRandomString: () => {
    return Math.random()
      .toString(36)
      .slice(2);
  },

  envSupportsForAwait: () => {
    return typeof Symbol !== 'undefined' && Symbol.asyncIterator;
  },
});
