///<reference path='./lib.d.ts' />
///<reference path='./net/net.d.ts' />
///<reference path='./Errors.d.ts' />
///<reference path='./Admin/Auth.d.ts' />
///<reference path='./Admin/Customers.d.ts' />
///<reference path='./Customer/Orders.d.ts' />
///<reference path='./Customer/Products.d.ts' />

declare module 'aifi' {
  export namespace Aifi {}

  export class Aifi {
    static Aifi: typeof Aifi;

    constructor(apiKey: string, config: Aifi.AifiConfig);

    AifiResource: Aifi.AifiResource;

    /**
     * Namespaced Resources
     */
    admin: {
      auth: Aifi.Admin.AuthResource;
      customers: Aifi.Admin.CustomersResource;
    };

    /**
     * API Errors
     */
    static errors: Aifi.Errors;
    errors: Aifi.Errors;

    on(event: 'request', handler: (event: Aifi.RequestEvent) => void): void;
    on(event: 'response', handler: (event: Aifi.ResponseEvent) => void): void;
    once(event: 'request', handler: (event: Aifi.RequestEvent) => void): void;
    once(event: 'response', handler: (event: Aifi.ResponseEvent) => void): void;
    off(event: 'request', handler: (event: Aifi.RequestEvent) => void): void;
    off(event: 'response', handler: (event: Aifi.ResponseEvent) => void): void;

    setProtocol(protocol: string): void;
  }

  export default Aifi;
}
