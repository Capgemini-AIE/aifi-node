declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      /**
       * Shape/structure for PaginatedListResponse
       */
      type PaginatedListResponse = Array<
        Aifi.Models.Order[] | Aifi.Models.PaginationResponse
      >;

      class OrdersResource {
        list(
          params: Aifi.Models.PaginatedParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<PaginatedListResponse>>;
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
          params: Aifi.Models.PaginatedParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<PaginatedListResponse>>;

        retrieveDraft(
          draftOrderID: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order>>;
      }
    }
  }
}
