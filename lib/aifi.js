'use strict';

const resources = require('./resources');

const DEFAULT_HOST = 'api.public-sandbox.cloud.aifi.io';
const DEFAULT_PORT = '443';
// const DEFAULT_BASE_PATH = '/api/admin/v2/';
const DEFAULT_BASE_PATH = '/api';
const DEFAULT_TIMEOUT = 10000;

const ALLOWED_CONFIG_PROPERTIES = [
  'httpAgent',
  'httpClient',
  'timeout',
  'host',
  'port',
  'protocol',
];

Aifi.PACKAGE_VERSION = require('../package.json').version;

const utils = require('./utils');

Aifi.AifiResource = require('./AifiResource');
Aifi.resources = resources;

const {HttpClient, HttpClientResponse} = require('./net/HttpClient');
Aifi.HttpClient = HttpClient;
Aifi.HttpClientResponse = HttpClientResponse;

function Aifi(key, config = {}) {
  if (!(this instanceof Aifi)) {
    return new Aifi(key, config);
  }

  const props = this._getPropsFromConfig(config);

  // Object.defineProperty(this, '_emitter', {
  //   value: new EventEmitter(),
  //   enumerable: false,
  //   configurable: false,
  //   writable: false,
  // });

  this.VERSION = Aifi.PACKAGE_VERSION;

  // this.on = this._emitter.on.bind(this._emitter);
  // this.once = this._emitter.once.bind(this._emitter);
  // this.off = this._emitter.removeListener.bind(this._emitter);

  if (
    props.protocol &&
    props.protocol !== 'https' &&
    (!props.host || /\.aifi\.io$/.test(props.host))
  ) {
    throw new Error(
      'The `https` protocol must be used when sending requests to `*.aifi.io`'
    );
  }

  const agent = props.httpAgent || null;

  this._api = {
    auth: null,
    host: props.host || DEFAULT_HOST,
    port: props.port || DEFAULT_PORT,
    protocol: props.protocol || 'https',
    basePath: DEFAULT_BASE_PATH,
    timeout: utils.validateInteger('timeout', props.timeout, DEFAULT_TIMEOUT),
    agent: agent,
    httpClient: props.httpClient || Aifi.createNodeHttpClient(agent),
    dev: false,
  };

  this._prepResources();
  this._setApiKey(key);

  this.errors = require('./Error');

  // Expose AifiResource on the instance too
  this.AifiResource = Aifi.AifiResource;
}

Aifi.errors = require('./Error');

Aifi.createNodeHttpClient = (agent) => {
  const {NodeHttpClient} = require('./net/NodeHttpClient');
  return new NodeHttpClient(agent);
};

Aifi.prototype = {
  getApiField(key) {
    return this._api[key];
  },

  /**
   * @private
   */
  _setApiField(key, value) {
    this._api[key] = value;
  },

  /**
   * @private
   */
  _setApiKey(key) {
    if (key) {
      this._setApiField('auth', `Bearer ${key}`);
    }
  },

  /**
   * @private
   */
  _prepResources() {
    for (const name in resources) {
      this[utils.pascalToCamelCase(name)] = new resources[name](this);
    }
  },

  /**
   * @private
   */
  getConstant: (c) => {
    switch (c) {
      case 'DEFAULT_HOST':
        return DEFAULT_HOST;
      case 'DEFAULT_PORT':
        return DEFAULT_PORT;
      case 'DEFAULT_BASE_PATH':
        return DEFAULT_BASE_PATH;
      case 'DEFAULT_TIMEOUT':
        return DEFAULT_TIMEOUT;
    }
    return Aifi[c];
  },

  /**
   * @private
   */
  _getPropsFromConfig(config) {
    // If config is null or undefined, just bail early with no props
    if (!config) {
      return {};
    }

    // config can be an object
    const isObject = config === Object(config) && !Array.isArray(config);

    if (!isObject) {
      throw new Error('Config must be an object');
    }

    // If config is an object, make sure it doesn't contain any unexpected values
    const values = Object.keys(config).filter(
      (value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)
    );

    if (values.length > 0) {
      throw new Error(
        `Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(
          ', '
        )}`
      );
    }

    return config;
  },
};

module.exports = Aifi;

// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Aifi = Aifi;

// Allow use with the TypeScript compiler without `esModuleInterop`.
// We may also want to add `Object.defineProperty(exports, "__esModule", {value: true});` in the future, so that Babel users will use the `default` version.
module.exports.default = Aifi;
