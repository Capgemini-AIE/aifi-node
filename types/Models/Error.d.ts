declare module 'aifi' {
  namespace Aifi {
    namespace Models {
      /**
       * Standard Error Response Model
       */
      interface Error {
        /**
         *  Error message
         */
        message: string;

        /**
         * Raw Error Type example ""E_CUSTOMER_LOGIN_FAIL"
         */
        type: string;
      }
    }
  }
}
