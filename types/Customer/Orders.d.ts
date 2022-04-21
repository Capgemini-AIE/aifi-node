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

        retrieve(
          orderId: string, // ATT: Make sure id's are url encoded
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order | Aifi.Models.Error>>;

        payment(
          orderId: string,
          options?: RequestOptions
        ): Promise<
          Aifi.Response<Aifi.Models.PaymentDetails | Aifi.Models.Error>
        >;

        listDrafts(
          params: Aifi.Models.PaginatedParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<PaginatedListResponse>>;

        retrieveDraft(
          draftOrderID: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order | Aifi.Models.Error>>;
      }
    }
  }
}
