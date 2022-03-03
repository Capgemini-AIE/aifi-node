declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface OrderCreateParams {
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
      }

      class OrdersResource {
        /**
         * Retrieves an auth token.
         */
        create(
          params: OrderCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Model.Order>>;
      }
    }
  }
}
