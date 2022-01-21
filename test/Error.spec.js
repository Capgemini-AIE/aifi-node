'use strict';

require('../testUtils');

const Error = require('../lib/Error');
const expect = require('chai').expect;

describe('Error', () => {
  describe('AifiError', () => {
    it('Generates specific instance depending on error-type', () => {
      expect(Error.AifiError.generate({type: 'E_UNAUTHORIZED'})).to.be.instanceOf(
        Error.AifiAuthenticationError
      );
    });

    it('Pulls in headers', () => {
      const headers = {'Request-Id': '123'};
      const e = Error.AifiError.generate({
        type: 'E_UNAUTHORIZED',
        headers,
      });
      expect(e).to.have.property('headers', headers);
    });

    it('Pulls in HTTP status code', () => {
      const e = Error.AifiError.generate({
        type: 'E_UNAUTHORIZED',
        statusCode: 400,
      });
      expect(e).to.have.property('statusCode', 400);
    });

    it('has subclasses which provide `.type` as their name', () => {
      class Foo extends Error.AifiError {}
      const err = new Foo({message: 'hi'});
      expect(err).to.have.property('type', 'Foo');
    });
  });
});
