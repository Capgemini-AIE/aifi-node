# Aifi Node.js Library

The Aifi Node library provides convenient access to the Aifi API from
applications written in server-side JavaScript.

## Requirements

Node 10 or higher.

## Installation

Install the package with:

```sh
npm install aifi --save
# or
yarn add aifi
```

## Usage

The package needs to be configured with your account's token.

<!-- prettier-ignore -->
```js
const aifi = require('aifi')('aifi_test_...');

aifi.admin.customers.create({
  email: 'customer@example.com',
  password: '123456789',
})
  .then(customer => console.log(customer.id))
  .catch(error => console.error(error));
```

Or using ES modules and `async`/`await`:

```js
import Aifi from 'aifi';
const aifi = new Aifi('aifi_test_...');

(async () => {
  const customer = await aifi.admin.customers.create({
    email: 'customer@example.com',
    password: '123456789',
  });

  console.log(customer.id);
})();
```

## Development

Run all tests:

```bash
$ yarn install
$ yarn test
```

If you do not have `yarn` installed, you can get it with `npm install --global yarn`.

Run a single test suite without a coverage report:

```bash
$ yarn mocha-only test/Error.spec.js
```

Run a single test (case sensitive) in watch mode:

```bash
$ yarn mocha-only test/Error.spec.js --grep 'Populates with type' --watch
```

If you wish, you may run tests using your Aifi _Test_ API key by setting the
environment variable `AIFI_TEST_API_KEY` before running the tests:

```bash
$ export AIFI_TEST_API_KEY='aifi_test....'
$ yarn test
```

Run prettier:

Add an [editor integration](https://prettier.io/docs/en/editors.html) or:

```bash
$ yarn fix
```
