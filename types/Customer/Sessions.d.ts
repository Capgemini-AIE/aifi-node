declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      interface LoginSessionParams {
        /**
         * Registered aifi user email address
         */
        email: string;

        /**
         * User password
         */
        password: string;
      }

      interface SessionResponse {
        accessToken: string;
        expiresAt: string;
      }

      interface EmptyResponse {}

      class SessionsResource {
        /**
         * Session management
         */
        login(
          params: LoginSessionParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<SessionResponse | Aifi.Models.Error>>;

        logout(
          params: object,
          options?: RequestOptions
        ): Promise<Aifi.Response<EmptyResponse>>;

        refresh(
          params: EntryCodeCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<SessionResponse>>;
      }
    }
  }
}
