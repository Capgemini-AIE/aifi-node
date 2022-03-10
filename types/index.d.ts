///<reference path='./lib.d.ts' />
///<reference path='./net/net.d.ts' />
///<reference path='./Errors.d.ts' />

// Models
///<reference path='./Models/Auth.d.ts'/>
///<reference path='./Models/Contest.d.ts'/>
///<reference path='./Models/Customer.d.ts'/>
///<reference path='./Models/Card.d.ts'/>
///<reference path='./Models/Order.d.ts'/>
///<reference path='./Models/Pagination.d.ts'/>
///<reference path='./Models/Product.d.ts'/>
///<reference path='./Models/Error.d.ts'/>

// Admin resources
///<reference path='./Admin/Auth.d.ts' />
///<reference path='./Admin/Config.d.ts' />
///<reference path='./Admin/Contests.d.ts' />
///<reference path='./Admin/Customers.d.ts' />
///<reference path='./Admin/Orders.d.ts' />
///<reference path='./Admin/Products.d.ts' />
///<reference path='./Admin/Sessions.d.ts' />
///<reference path='./Admin/Stores.d.ts' />
///<reference path='./Admin/Tasks.d.ts' />
// Customer resources
///<reference path='./Customer/Contests.d.ts' />
///<reference path='./Customer/Customers.d.ts' />
///<reference path='./Customer/EntryCodes.d.ts' />
///<reference path='./Customer/Orders.d.ts' />
///<reference path='./Customer/PasswordReset.d.ts' />
///<reference path='./Customer/Payments.d.ts' />
///<reference path='./Customer/Products.d.ts' />
///<reference path='./Customer/Sessions.d.ts' />
// Store resource

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
      config: Aifi.Admin.ConfigResource;
      contests: Aifi.Admin.ContestsResource;
      customers: Aifi.Admin.CustomersResource;
      orders: Aifi.Admin.OrdersResource;
      products: Aifi.Admin.ProductsResource;
      sessions: Aifi.Admin.SessionsResource;
      stores: Aifi.Admin.StoresResource;
      tasks: Aifi.Admin.TasksResource;
    };

    customer: {
      contests: Aifi.Customer.ContestsResource;
      customers: Aifi.Customer.CustomersResource;
      entrycodes: Aifi.Customer.EntryCodesResource;
      orders: Aifi.Customer.OrdersResource;
      passwordreset: Aifi.Customer.PasswordResetResource;
      payments: Aifi.Customer.PaymentResource;
      products: Aifi.Customer.ProductsResource;
      sessions: Aifi.Customer.SessionsResource;
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
