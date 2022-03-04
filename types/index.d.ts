///<reference path='./lib.d.ts' />
///<reference path='./net/net.d.ts' />
///<reference path='./Errors.d.ts' />

// Models
///<reference path='./Models/Contest.d.ts'/>
///<reference path='./Models/Customer.d.ts'/>
///<reference path='./Models/Card.d.ts'/>
///<reference path='./Models/Order.d.ts'/>
///<reference path='./Models/Product.d.ts'/>

// API specific resource types
// Admin resource
///<reference path='./Admin/Auth.d.ts' />
///<reference path='./Admin/Customers.d.ts' />
// Customer resource
///<reference path='./Customer/Contests.d.ts' />
///<reference path='./Customer/Customers.d.ts' />
///<reference path='./Customer/Orders.d.ts' />
///<reference path='./Customer/Products.d.ts' />
// Orders resource

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

    customer: {
      contests: Aifi.Customer.ContestsResource;
      customers: Aifi.Customer.CustomersResource;
      products: Aifi.Customer.ProductsResource;
      orders: Aifi.Customer.OrdersResource;
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
