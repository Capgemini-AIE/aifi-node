declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface ProductSearchParams {
        /**
         * Query search param.
         */
        query: string;

        /**
         * Return count.
         */
        count: number;

        /**
         * Offset.
         */
        offset?: number;

        /**
         * Order by filtering.
         */
        orderBy?: string;

        /**
         * The list direction.
         */
        direction?: string;
      }

      class ProductsResource {
        /**
         * Retrieves an auth token.
         */
        search(
          params: ProductSearchParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Models.Product[]>>;
      }
    }
  }
}
