declare module 'aifi' {
  namespace Aifi {
    namespace Models {
      /**
       * The Auth token object.
       */
      interface AccessToken {
        /**
         * The access token string
         */
        accessToken: string;

        /**
         * The token expiry date string
         */
        expiresAt: string;

        /**
         * Currency is an extended optional object that attachees to the
         * the access token.
         */
      }
    }
  }
}
