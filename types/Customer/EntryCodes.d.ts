declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface EntryCodeCreateParams {
        /**
         * The order id to be contested
         */
        groupSize: number;
      }

      interface EntryCodeSuccessResponse {
        verificationCode: string;
      }

      class EntryCodesResource {
        /**
         * Retrieves an auth token.
         */
        create(
          params: EntryCodeCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<EntryCodeSuccessResponse>>;
      }
    }
  }
}
