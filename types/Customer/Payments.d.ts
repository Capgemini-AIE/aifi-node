declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface SuccessResponse {
        form: string;
      }

      class PaymentResource {
        /**
         *.Payment resource methods
         */
        create(
          provider: string,
          options?: RequestOptions
        ): Promise<Aifi.Response<SuccessResponse>>;
      }
    }
  }
}
