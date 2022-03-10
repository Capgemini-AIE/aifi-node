declare module 'aifi' {
  namespace Aifi {
    namespace Admin {
      class ConfigResource {
        /**
         * Retrieves an auth token.
         */
        retrieveToken(
          params: AuthTokenParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<Aifi.Admin.Auth>>;
      }
    }
  }
}
