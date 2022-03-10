declare module 'aifi' {
  namespace Aifi {
    namespace Admin {
      class OrdersResource {
        /**
         * Retrieves an auth token.
         */
        retrieveToken(
          params: object,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Admin.Auth>>;
      }
    }
  }
}
