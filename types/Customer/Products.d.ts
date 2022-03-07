declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface ProductSearchParams {
        /**
         * The customer's email address.
         */
        query: string;

        /**
         * The customer's email address.
         */
        count: number;

        /**
         * The customer's first name.
         */
        offset?: number;

        /**
         * The customer's last name.
         */
        orderBy?: string;

        /**
         * The customer's phone number.
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
