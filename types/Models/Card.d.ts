declare module 'aifi' {
  namespace Aifi {
    namespace Model {
      /**
       * The Credit Card Model.
       */
      interface Card {
        /**
         * Card type/brand (Visa, Mastercard etc...)
         */
        brand: string;

        /**
         * Card expiry month
         */
        exp_month: number;

        /**
         * Card type/brand (Visa, Mastercard etc...)
         */
        exp_year: number;

        /**
         * Card type/brand (Visa, Mastercard etc...)
         */
        last4: number;
      }
    }
  }
}
