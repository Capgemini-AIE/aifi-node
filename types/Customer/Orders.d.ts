declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      class OrdersResource {
        list(
          params: Aifi.Models.PaginatedParams,
          options?: RequestOptions
        ): Promise<Aifi.Response>;

        retrieve(
          orderId: string,
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
        ): Promise<Aifi.Response>;

        retrieveDraft(
          draftOrderID: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Order | Aifi.Models.Error>>;
      }
    }
  }
}
