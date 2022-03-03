declare module 'aifi' {
  namespace Aifi {
    namespace Model {
      /**
       * The Customer object.
       */
      interface Customer {
        /**
         * Unique identifier for the object.
         */
        id?: string;

        /**
         * The customer's email address.
         */
        email?: string;

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
         * The tax id for the customer.
         */
        taxId?: string;

        /**
         * The credit card payment method reference for the customer
         */
        card?: Aifi.Model.Card;

        /**
         * The customers local language code
         */
        localeLanguageCode?: string;

        /**
         * Customer role type
         */
        role?: Role;

        /**
         * Is the customer fully registered
         */
        fullyRegistered: string;

        /**
         * Customer's company name
         */
        companyName: string;

        /**
         * Address
         */
        address: string;

        /**
         * If the customer has been blocked
         */
        blocked?: boolean;
      }

      type Role = 'employee' | 'customer' | 'tester';
    }
  }
}
