declare module 'aifi' {
  namespace Aifi {
    namespace Admin {
      interface Customer extends Aifi.Models.Customer {}

      interface CustomerEntryCode {
        code: string;
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

      interface CustomerUpdateParams {
        /**
         * The customer's email address.
         */
        email?: string;

        /**
         * The new password to set for the user.
         */
        password?: string;

        /**
         * current password of the user
         */
        currentPassword?: string;

        /**
         * The customer's last name.
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
         * Customer card data.
         */
        card?: Customer.Card;

        /**
         * Customers role.
         */
        role?: Customer.Role;

        /**
         * If true the customer cannot enter the store
         */
        blocked?: boolean;
      }

      interface CustomerCreateEntryCodeParams {
        /**
         * Entry code to be added to valid customer codes
         */
        code?: string;

        /**
         * Group size for that entry code
         */
        groupSize?: number;

        /**
         * session token sent out later by aifi to identify transactions made on this entry code
         */
        sessionId?: string;

        /**
         * ISO 8601 encoded time, at which this entry code will expire. If not specified a default value (depending on a deployment) will be set.
         */
        expiresAt?: string;
      }

      namespace CustomerPaymentTypes {
        type Provider = 'NONE' | 'STRIPE' | 'FIRST_DATA' | 'PAYTER';
      }

      namespace Customer {
        type Role = 'employee' | 'customer' | 'tester';

        interface Card {
          /**
           * The card provider.
           */
          provider: CustomerPaymentTypes.Provider;

          /**
           * The tokenised card string.
           */
          cardToken: string;

          /**
           * Flag to indicate if default payment card.
           */
          defaultCard: boolean;
        }
      }

      class CustomersResource {
        /**
         * Creates a new customer.
         */
        create(
          params: CustomerCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Customer>>;

        /**
         * Retrieves a Customer object.
         */
        retrieve(
          customerId: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Customer>>;

        /**
         * Updates the specified customer by setting the values of the parameters passed.
         */
        update(
          customerId: string,
          params?: CustomerUpdateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Customer>>;

        /**
         * Creates a store entry code for that customer
         */
        createEntryCode(
          customerId: string,
          params?: CustomerCreateEntryCodeParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Customer>>;
      }
    }
  }
}
