declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface PaginationParams {
        /**
         * Count
         */
        count?: number;

        /**
         * Sort oder ASC ascending or DESC descending
         */
        direction?: string;

        /**
         * Pagination after
         */
        after?: string;

        /**
         * Pagination before
         */
        before?: string;

        /**
         * Id of the store where the order was placed
         */
        storeId?: number;
      }

      class OrdersResource {
        list(
          params: PaginationParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order[]>>;
        // TODO: Pagination Questions?! How?!

        retrieve(
          orderId: string, // ATT: Make sure id's are url encoded
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order>>;

        payment(
          orderId: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.PaymentDetails>>;

        listDrafts(
          params: PaginationParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order[]>>;

        retrieveDraft(
          draftOrderID: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order>>;
      }
    }
  }
}
