declare module 'aifi' {
  namespace Aifi {
    namespace Models {
      /**
       * The contest object.
       */
      interface ContestedItem {
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

      interface ContestedOrder {
        id: number;
        orderId: number;
        sessionId: number;
        message: string;
        status: Status;
        order: SimpleOrderData[];
      }

      interface SimpleOrderData {
        id: number;
        customerId: number;
        customerShoppingSessionId: number;
        storeId: number;
        transactionId: number;
        externalId: string;
        status: Status;
        externalStatus;
        updatedAt;
        createdAt;
      }

      enum Status {
        CONTESTED = 'contested',
        REVIEWED = 'reviewed',
      }
    }
  }
}
