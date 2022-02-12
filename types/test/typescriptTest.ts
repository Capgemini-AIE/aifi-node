/**
 * This file does not exist to be executed, just compiled,
 * so that we can ensure that the definition files
 * only reference names that exist,
 * and to perform a basic sanity check that types are exported as intended.
 */

///<reference types="../" />
import Aifi from 'aifi';

let aifi = new Aifi('aifi_token_123', {});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore lazily ignore apiVersion requirement.
aifi = new Aifi('token_test_123');

// Check config object.
aifi = new Aifi('token_test_123', {
  timeout: 1000,
  host: 'api.example.com',
  port: 123,
  httpClient: Aifi.createNodeHttpClient(),
});

async (): Promise<void> => {
  const params: Aifi.Admin.CustomerCreateParams = {
    email: 'test@test.com',
    password: '1233456789',
  };
  const opts: Aifi.RequestOptions = {
    timeout: 3000,
  };
  const customer: Aifi.Admin.Customer = await aifi.admin.customers.create(
    params,
    opts
  );

  // Check no opts:
  await aifi.admin.customers.create(params);
};
