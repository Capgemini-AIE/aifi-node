declare module 'aifi' {
  namespace Aifi {
    namespace Admin {
      /**
       * The Customer object.
       */
      interface Customer {
        /**
         * Unique identifier for the object.
         */
        id: string;

        /**
         * The customer's email address.
         */
        email: string;

        /**
         * The customer's first name.
         */
        firstName?: string;

        /**
         * The customer's last name.
         */
        lastName?: string;

        /**
         * The customer's phone number.
         */
        phone?: string;

        /**
         * A reference to a unique external identified for the customer.
         */
        externalId?: string;
      }

      interface CustomerCreateParams {
        /**
         * The customer's email address.
         */
        email: string;

        /**
         * The customer's email address.
         */
        password: string;

        /**
         * The customer's first name.
         */
        firstName?: string;

        /**
         * The customer's last name.
         */
        lastName?: string;

        /**
         * The customer's phone number.
         */
        phone?: string;

        /**
         * A reference to a unique external identified for the customer.
         */
        externalId?: string;

        role?: Customer.Role;
      }

      namespace Customer {
        type Role = 'employee' | 'customer' | 'tester';
      }

      class CustomersResource {
        /**
         * Retrieves an auth token.
         */
        create(
          params: CustomerCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Admin.Customer>>;
      }
    }
  }
}
