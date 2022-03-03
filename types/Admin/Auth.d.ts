declare module 'aifi' {
  namespace Aifi {
    namespace Customer {
      /**
       * The Auth token object.
       */
      interface Auth {
        /**
         * The access token string
         */
        accessToken: string;

        /**
         * The token expiry date string
         */
        expiresAt: string;
      }

      interface AuthTokenParams {
        /*
         * HMAC calculated from the whole url
         */
        hmac: string;

        /**
         * Timestamp in seconds
         */
        timestamp: number;

        /**
         * The the session ID of the customer for this session.
         */
        session?: string;

        /**
         * The name of the shop e.g. nanostore-beta.myshopify.com
         */
        shop: string;

        /**
         * The locale to use
         */
        locale: AuthTokenParams.Locale;
      }

      namespace AuthTokenParams {
        type Locale =
          | 'bg'
          | 'cs'
          | 'da'
          | 'de'
          | 'el'
          | 'en'
          | 'en-AU'
          | 'en-CA'
          | 'en-GB'
          | 'en-IE'
          | 'en-IN'
          | 'en-NZ'
          | 'en-SG'
          | 'es'
          | 'es-419'
          | 'et'
          | 'fi'
          | 'fil'
          | 'fr'
          | 'fr-CA'
          | 'hr'
          | 'hu'
          | 'id'
          | 'it'
          | 'ja'
          | 'ko'
          | 'lt'
          | 'lv'
          | 'ms'
          | 'mt'
          | 'nb'
          | 'nl'
          | 'pl'
          | 'pt'
          | 'pt-BR'
          | 'ro'
          | 'ru'
          | 'sk'
          | 'sl'
          | 'sv'
          | 'th'
          | 'tr'
          | 'vi'
          | 'zh'
          | 'zh-HK'
          | 'zh-TW';
      }

      class AuthResource {
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
