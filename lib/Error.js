'use strict';

/**
 * AifiError is the base error from which all other more specific Aifi errors derive.
 * Specifically for errors returned from Aifi's REST API.
 */
class AifiError extends Error {
  constructor(raw = {}) {
    super(raw.message);
    this.type = this.constructor.name;

    this.raw = raw;
    this.rawType = raw.type;
    this.headers = raw.headers;
    this.statusCode = raw.statusCode;
    this.message = raw.message;
  }

  /**
   * Helper factory which takes raw aifi errors and outputs wrapping instances
   */
  static generate(rawAifiError) {
    switch (rawAifiError.type) {
      case 'invalid_request_error':
        return new AifiInvalidRequestError(rawAifiError);
      case 'api_error':
        return new AifiAPIError(rawAifiError);
      case 'E_UNAUTHORIZED':
        return new AifiAuthenticationError(rawAifiError);
      default:
        return new GenericError('Generic', 'Unknown Error');
    }
  }
}

// Specific Aifi Error types:

/**
 * InvalidRequestError is raised when a request is initiated with invalid
 * parameters.
 */
class AifiInvalidRequestError extends AifiError {}

/**
 * AuthenticationError is raised when invalid credentials are used to connect
 * to Aifi's servers.
 */
class AifiAuthenticationError extends AifiError {}

/**
 * APIError is a generic error that may be raised in cases where none of the
 * other named errors cover the problem. It could also be raised in the case
 * that a new error has been introduced in the API, but this version of the
 * Node.JS SDK doesn't know how to handle it.
 */
class AifiAPIError extends AifiError {}

/**
 * AifiConnectionError is raised in the event that the SDK can't connect to
 * Aifi's servers. That can be for a variety of different reasons from a
 * downed network to a bad TLS certificate.
 */
class AifiConnectionError extends AifiError {}

/**
 * PermissionError is raised in cases where access was attempted on a resource
 * that wasn't allowed.
 */
class AifiPermissionError extends AifiError {}

module.exports.generate = AifiError.generate;
module.exports.AifiError = AifiError;
module.exports.AifiInvalidRequestError = AifiInvalidRequestError;
module.exports.AifiAuthenticationError = AifiAuthenticationError;
module.exports.AifiAPIError = AifiAPIError;
module.exports.AifiConnectionError = AifiConnectionError;
module.exports.AifiPermissionError = AifiPermissionError;
