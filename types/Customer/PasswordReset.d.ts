declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface PasswordResetParams {
        /**
         * A randomly generated by client, unique string to indentify a single reset-code operation flow
         */
        token: string;

        /**
         * Registered aifi user email address
         */
        email: string;
      }

      interface EntryCodeSuccessResponse {
        verificationCode: string;
      }

      interface PasswordSetParams {
        /**
         * A randomly generated by client, unique string to indentify a single reset-code operation flow
         */
        token: string;

        /**
         * New password to be set as new password
         */
        password: string;
      }

      interface PasswordVerifySuccessResponse {
        token: string;
      }

      class PasswordResetResource {
        /**
         * Reset user password
         */
        reset(
          params: PasswordResetParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<>>;

        set(
          params: PasswordSetParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<>>;

        verify(
          params: EntryCodeCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<PasswordVerifySuccessResponse>>;
      }
    }
  }
}
