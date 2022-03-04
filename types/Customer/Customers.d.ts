declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
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

        /**
         * Customer role
         */
        role?: Customer.Role;
      }

      namespace Customer {
        type Role = 'employee' | 'customer' | 'tester';
      }

      interface CustomerUpdateParams {
        /**
         * New password for the customer. Only valid
         * combined with the currentPassword
         */
        password?: string;

        /**
         * Current password. Only required when
         * changing password, in combination with password
         */
        currentPassword?: string;

        firstName?: string;

        lastName?: string;

        email?: string;

        phone?: string;

        notificationToken?: string;

        /**
         * Lnaguage code "pl", "en", "zh", "fr", etc...
         */
        localeLanguageCode?: string;

        taxId?: string;

        companyName?: string;

        address?: string;

        /**
         * Whether the customer completed registration
         */
        fullyRegistered?: string;
      }

      class CustomersResource {
        /**
         * Retrieves an auth token.
         */
        create(
          params: CustomerCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Customer>>;

        // TODO ask question regarding response!?
        // in documentation response is access token
        // for our api we are already authed so we probably
        // just want the customer details back?

        retrieve(
          customerId: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Customer>>;

        update(
          customerId: string,
          params?: CustomerUpdateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Customer>>;
      }
    }
  }
}
