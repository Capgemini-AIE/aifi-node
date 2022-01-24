'use strict';

require('../testUtils');

const utils = require('../lib/utils');
const expect = require('chai').expect;

describe('utils', () => {
  describe('makeURLInterpolator', () => {
    it('Interpolates values into a prepared template', () => {
      const template = utils.makeURLInterpolator('/some/url/{foo}/{baz}?ok=1');

      expect(template({foo: 1, baz: 2})).to.equal('/some/url/1/2?ok=1');

      expect(template({foo: '', baz: ''})).to.equal('/some/url//?ok=1');

      expect(
        // Test encoding:
        template({foo: 'FOO', baz: '__::baz::__'})
      ).to.equal('/some/url/FOO/__%3A%3Abaz%3A%3A__?ok=1');
    });
  });

  describe('extractUrlParams', () => {
    it('works with multiple params', () => {
      expect(
        utils.extractUrlParams('stores/{storeId}/planogram/{gondolaId}')
      ).to.deep.equal(['storeId', 'gondolaId']);
    });
  });

  describe('stringifyRequestData', () => {
    it('Handles basic types', () => {
      expect(
        utils.stringifyRequestData({
          a: 1,
          b: 'foo',
        })
      ).to.equal('a=1&b=foo');
    });

    it('Handles Dates', () => {
      expect(
        utils.stringifyRequestData({
          date: new Date('2009-02-13T23:31:30Z'),
          created: {
            gte: new Date('2009-02-13T23:31:30Z'),
            lt: new Date('2044-05-01T01:28:21Z'),
          },
        })
      ).to.equal(
        [
          'date=1234567890',
          'created[gte]=1234567890',
          'created[lt]=2345678901',
        ].join('&')
      );
    });

    it('Handles deeply nested object', () => {
      expect(
        utils.stringifyRequestData({
          a: {
            b: {
              c: {
                d: 2,
              },
            },
          },
        })
      ).to.equal('a[b][c][d]=2');
    });

    it('Handles arrays of objects', () => {
      expect(
        utils.stringifyRequestData({
          a: [{b: 'c'}, {b: 'd'}],
        })
      ).to.equal('a[0][b]=c&a[1][b]=d');
    });

    it('Handles indexed arrays', () => {
      expect(
        utils.stringifyRequestData({
          a: {
            0: {b: 'c'},
            1: {b: 'd'},
          },
        })
      ).to.equal('a[0][b]=c&a[1][b]=d');
    });

    it('Creates a string from an object, handling shallow nested objects', () => {
      expect(
        utils.stringifyRequestData({
          test: 1,
          foo: 'baz',
          somethingElse: '::""%&',
          nested: {
            1: 2,
            'a n o t h e r': null,
          },
        })
      ).to.equal(
        [
          'test=1',
          'foo=baz',
          'somethingElse=%3A%3A%22%22%25%26',
          'nested[1]=2',
          'nested[a%20n%20o%20t%20h%20e%20r]=',
        ].join('&')
      );
    });
  });

  describe('protoExtend', () => {
    it('Provides an extension mechanism', () => {
      function A() {}
      A.extend = utils.protoExtend;
      const B = A.extend({
        constructor: function () {
          this.called = true;
        },
      });
      expect(new B()).to.be.an.instanceof(A);
      expect(new B()).to.be.an.instanceof(B);
      expect(new B().called).to.equal(true);
      expect(B.extend === utils.protoExtend).to.equal(true);
    });
  });

  describe('getDataFromArgs', () => {
    it('handles an empty list', () => {
      expect(utils.getDataFromArgs([])).to.deep.equal({});
    });

    it('handles a list with no object', () => {
      const args = [1, 3];
      expect(utils.getDataFromArgs(args)).to.deep.equal({});
      expect(args.length).to.equal(2);
    });

    it('ignores a hash with only options', (done) => {
      const args = [{host: 'foo'}];

      handleWarnings(
        () => {
          expect(utils.getDataFromArgs(args)).to.deep.equal({});
          expect(args.length).to.equal(1);

          done();
        },
        (message) => {
          throw new Error(`Should not have warned, but did: ${message}`);
        }
      );
    });

    it('warns if the hash contains both data and options', (done) => {
      const args = [{foo: 'bar', apiKey: 'foo', host: 'baz'}];

      handleWarnings(
        () => {
          utils.getDataFromArgs(args);
        },
        (message) => {
          expect(message).to.equal(
            'Aifi: Options found in arguments (host).' +
              ' Did you mean to pass an options object?'
          );

          done();
        }
      );
    });

    it('finds the data', () => {
      const args = [{foo: 'bar'}, {apiKey: 'foo'}];
      expect(utils.getDataFromArgs(args)).to.deep.equal({foo: 'bar'});
      expect(args.length).to.equal(1);
    });
  });

  describe('getOptsFromArgs', () => {
    it('handles an empty list', () => {
      expect(utils.getOptionsFromArgs([])).to.deep.equal({
        auth: null,
        headers: {},
        settings: {},
      });
    });

    it('handles an list with no object', () => {
      const args = [1, 3];
      expect(utils.getOptionsFromArgs(args)).to.deep.equal({
        auth: null,
        headers: {},
        settings: {},
      });
      expect(args.length).to.equal(2);
    });

    it('ignores a non-options object', () => {
      const args = [{foo: 'bar'}];
      expect(utils.getOptionsFromArgs(args)).to.deep.equal({
        auth: null,
        headers: {},
        settings: {},
      });
      expect(args.length).to.equal(1);
    });

    it('parses an api key', () => {
      const args = ['aifi_test_iiiiiiiiiiiiiiiiiiiiiiii'];
      expect(utils.getOptionsFromArgs(args)).to.deep.equal({
        auth: 'aifi_test_iiiiiiiiiiiiiiiiiiiiiiii',
        headers: {},
        settings: {},
      });
      expect(args.length).to.equal(0);
    });

    it('assumes any string is an api key', () => {
      const args = ['yolo'];
      expect(utils.getOptionsFromArgs(args)).to.deep.equal({
        auth: 'yolo',
        headers: {},
        settings: {},
      });
      expect(args.length).to.equal(0);
    });

    it('warns if the hash contains something that does not belong', (done) => {
      const args = [
        {foo: 'bar'},
        {
          timeout: 10000,
          fishsticks: true,
          custard: true,
        },
      ];

      handleWarnings(
        () => {
          utils.getOptionsFromArgs(args);
        },
        (message) => {
          expect(message).to.equal(
            'Aifi: Invalid options found (fishsticks, custard); ignoring.'
          );

          done();
        }
      );
    });
  });

  describe('removeNullish', () => {
    it('removes empty properties and leaves non-empty ones', () => {
      expect(
        utils.removeNullish({
          cat: 3,
          dog: false,
          rabbit: undefined,
          pointer: null,
        })
      ).to.eql({
        cat: 3,
        dog: false,
      });
    });

    it('throws an error if not given an object', () => {
      expect(() => {
        utils.removeNullish('potato');
      }).to.throw();
    });
  });

  describe('validateInteger', () => {
    it("Returns the given value if it's a valid integer", () => {
      const cases = [1, 0x123, 1e3, Number.MAX_SAFE_INTEGER];

      cases.forEach((int) => {
        expect(utils.validateInteger('magicNumber', int)).to.equal(int);
      });
    });

    it('Throws an error if the value is not an integer', () => {
      const cases = ['foo', 1.2, Number.POSITIVE_INFINITY];

      cases.forEach((val) => {
        expect(() => {
          utils.validateInteger('magicNumber', val);
        }).to.throw();
      });
    });

    it('Returns a default value if n is not provided', () => {
      const expected = 1000;
      [null, undefined].forEach((t) => {
        expect(utils.validateInteger('magicNumber', t, expected)).to.equal(
          expected
        );
      });
    });

    it('Throws if neither value nor default is set', () => {
      expect(() => {
        utils.validateInteger('magicNumber');
      }).to.throw();
    });
  });
});

function handleWarnings(doWithShimmedConsoleWarn, onWarn) {
  if (typeof process.emitWarning !== 'function') {
    /* eslint-disable no-console */

    // Shim `console.warn`
    const _warn = console.warn;
    console.warn = onWarn;

    doWithShimmedConsoleWarn();

    // Un-shim `console.warn`,
    console.warn = _warn;

    /* eslint-enable no-console */
  } else {
    /* eslint-disable-next-line no-inner-declarations */
    function onProcessWarn(warning) {
      onWarn(`${warning.name}: ${warning.message}`);
    }

    process.on('warning', onProcessWarn);

    doWithShimmedConsoleWarn();

    process.nextTick(() => {
      process.removeListener('warning', onProcessWarn);
    });
  }
}
