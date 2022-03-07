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
        ): Promise<Aifi.Response<SessionsResponse>>;

        logout(
          params: object,
          options?: RequestOptions
        ): Promise<Aifi.Response<EmptyResponse>>; // TODO Question, how to return no response?

        refresh(
          params: EntryCodeCreateParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<SessionResponse>>;
      }
    }
  }
}
