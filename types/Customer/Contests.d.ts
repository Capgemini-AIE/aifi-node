declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface ContestCreateParams {
        /**
         * The order id to be contested
         */
        orderId: string;

        /**
         * The customer's email address.
         */
        message: string;

        /**
         * Items array
         */
        items: Aifi.Models.ContestItem[];
      }

      class ContestsResource {
        /**
         * Retrieves an auth token.
         */
        create(
          params: ContestCreateParams,
          options?: RequestOptions
        ): Promise<
          Aifi.Response<Aifi.Models.ContestItem[] | Aifi.Models.Error>
        >;
      }
    }
  }
}
