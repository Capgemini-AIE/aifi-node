'use strict';

const path = require('path');

const utils = require('./utils');
const {
  AifiConnectionError,
  AifiAuthenticationError,
  AifiError,
  AifiAPIError,
  AifiPermissionError,
} = require('./Error');

const HttpClient = require('./net/HttpClient');

// Provide extension mechanism for Aifi Resource Sub-Classes
AifiResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
AifiResource.method = require('./AifiMethod');

/**
 * Encapsulates request logic for a Aifi Resource
 */
function AifiResource(aifi) {
  this._aifi = aifi;

  this.basePath = utils.makeURLInterpolator(
    this.basePath || aifi.getApiField('basePath')
  );
  this.resourcePath = this.path;
  this.path = utils.makeURLInterpolator(this.path);

  this.initialize(...arguments);
}

AifiResource.prototype = {
  path: '',

  // Methods that don't use the API's default '/v2' path can override it with this setting.
  basePath: null,

  initialize() {},

  // Function to override the default data processor. This allows full control
  // over how a AifiResource's request data will get converted into an HTTP
  // body. This is useful for non-standard HTTP requests. The function should
  // take method name, data, and headers as arguments.
  requestDataProcessor: null,

  createFullPath(commandPath, urlData) {
    return path
      .join(
        this.basePath(urlData),
        this.path(urlData),
        typeof commandPath == 'function' ? commandPath(urlData) : commandPath
      )
      .replace(/\\/g, '/'); // ugly workaround for Windows
  },

  // Creates a relative resource path with symbols left in (unlike
  // createFullPath which takes some data to replace them with). For example it
  // might produce: /invoices/{id}
  createResourcePathWithSymbols(pathWithSymbols) {
    return `/${path
      .join(this.resourcePath, pathWithSymbols || '')
      .replace(/\\/g, '/')}`; // ugly workaround for Windows
  },

  _makeResponseEvent(requestEvent, statusCode, headers) {
    return utils.removeNullish({
      method: requestEvent.method,
      path: requestEvent.path,
      status: statusCode,
    });
  },

  /**
   * Default handler for Aifi responses. Buffers the response into memory,
   * parses the JSON and returns it (i.e. passes it to the callback) if there
   * is no "error" field. Otherwise constructs/passes an appropriate Error.
   */
  _jsonResponseHandler(requestEvent, callback) {
    return (res) => {
      const headers = res.getHeaders();
      const statusCode = res.getStatusCode();

      // const responseEvent = this._makeResponseEvent(
      //   requestEvent,
      //   statusCode,
      //   headers
      // );
      // this._aifi._emitter.emit('response', responseEvent);

      res
        .toJSON()
        .then(
          (jsonResponse) => {
            // If response has .type that indicates an error response.
            if (jsonResponse.type) {
              let err;

              jsonResponse.error = jsonResponse;
              jsonResponse.error.headers = headers;
              jsonResponse.error.statusCode = statusCode;

              if (statusCode === 401) {
                err = new AifiAuthenticationError(jsonResponse.error);
              } else if (statusCode === 403) {
                err = new AifiPermissionError(jsonResponse.error);
              } else {
                err = AifiError.generate(jsonResponse.error);
              }

              throw err;
            }

            return jsonResponse;
          },
          (e) => {
            throw new AifiAPIError({
              message: 'Invalid JSON received from the Aifi API',
              exception: e,
            });
          }
        )
        .then(
          (jsonResponse) => {
            // Expose raw response object.
            const rawResponse = res.getRawResponse();
            Object.defineProperty(jsonResponse, 'lastResponse', {
              enumerable: false,
              writable: false,
              value: rawResponse,
            });

            callback.call(this, null, jsonResponse);
          },
          (e) => callback.call(this, e, null)
        );
    };
  },

  _generateConnectionErrorMessage() {
    return 'An error occurred with our connection to Aifi.';
  },

  _makeHeaders(
    auth,
    contentLength,
    method,
    userSuppliedHeaders,
    userSuppliedSettings
  ) {
    const defaultHeaders = {
      // Use specified auth token or use default from this aifi instance:
      Authorization: auth ? `Bearer ${auth}` : this._aifi.getApiField('auth'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': contentLength,
      'User-Agent': this._getUserAgentString(),
    };

    return Object.assign(
      utils.removeNullish(defaultHeaders),
      // If the user supplied, say 'this-key', override instead of appending by ensuring caps are the same.
      utils.normalizeHeaders(userSuppliedHeaders)
    );
  },

  _getUserAgentString() {
    const packageVersion = this._aifi.getConstant('PACKAGE_VERSION');

    return `Aifi/ApiClient/${packageVersion}`;
  },

  _request(method, host, path, data, auth, options = {}, callback) {
    let requestData;

    const makeRequest = (headers) => {
      // timeout can be set on a per-request basis. Favor that over the global setting
      const timeout =
        options.settings &&
        Number.isInteger(options.settings.timeout) &&
        options.settings.timeout >= 0
          ? options.settings.timeout
          : this._aifi.getApiField('timeout');

      const req = this._aifi
        .getApiField('httpClient')
        .makeRequest(
          host || this._aifi.getApiField('host'),
          this._aifi.getApiField('port'),
          path,
          method,
          headers,
          requestData,
          this._aifi.getApiField('protocol'),
          timeout
        );

      const requestEvent = utils.removeNullish({
        method,
        path,
      });

      // this._aifi._emitter.emit('request', requestEvent);

      req
        .then((res) => {
          return this._jsonResponseHandler(requestEvent, callback)(res);
        })
        .catch((error) => {
          const isTimeoutError =
            error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE;

          return callback.call(
            this,
            new AifiConnectionError({
              message: isTimeoutError
                ? `Request aborted due to timeout being reached (${timeout}ms)`
                : this._generateConnectionErrorMessage(),
              detail: error,
            })
          );
        });
    };

    const prepareAndMakeRequest = (error, data) => {
      if (error) {
        return callback(error);
      }

      requestData = data;

      const headers = this._makeHeaders(
        auth,
        requestData.length,
        method,
        options.headers,
        options.settings
      );

      makeRequest(headers);
    };

    if (this.requestDataProcessor) {
      this.requestDataProcessor(
        method,
        data,
        options.headers,
        prepareAndMakeRequest
      );
    } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      prepareAndMakeRequest(null, JSON.stringify(data));
    } else {
      prepareAndMakeRequest(null, utils.stringifyRequestData(data || {}));
    }
  },
};

module.exports = AifiResource;
