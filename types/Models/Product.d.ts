declare module 'aifi' {
  namespace Aifi {
    namespace Model {
      /**
       * The Customer object.
       */
      interface Product {
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
    }
  }
}
