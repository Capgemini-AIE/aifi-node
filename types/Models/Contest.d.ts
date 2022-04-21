declare module 'aifi' {
  namespace Aifi {
    namespace Models {
      /**
       * The contest object.
       */
      interface ContestItem {
        /**
         * TODO: What is rin, clarify??
         */
        rin?: string;

        /**
         * Unique identifier for the product.
         */
        productId: string;

        /**
         *  Item Quantity.
         */
        quantity?: number;

        /**
         *  Original quantity.
         */
        originalQuantity?: number;

        /**
         *  Contested quantity.
         */
        contestedQuantity?: number;

        /**
         *  Reviewed quantity.
         */
        reviewedQuantity?: number;
      }
    }
  }
}
