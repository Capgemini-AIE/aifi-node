declare module 'aifi' {
  namespace Aifi {
    namespace Models {
      /**
       * The Customer object.
       */
      interface Product {
        /**
         * Unique identifier for the object.
         */
        id: string;

        /**
         * Product name.
         */
        name: string;

        /**
         * The customer's first name.
         */
        thumbnail?: string;

        /**
         * Rin identification
         */
        rin?: string;
      }
    }
  }
}
