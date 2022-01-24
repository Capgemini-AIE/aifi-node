declare module 'aifi' {
  namespace Aifi {
    export type Errors = {
      generate: typeof AifiError.generate;
      AifiError: typeof AifiError;
      AifiAuthenticationError: typeof AifiAuthenticationError;
    };

    export type RawErrorType = 'E_UNAUTHORIZED';

    export type AifiRawError = {
      message?: string;

      type: RawErrorType;

      headers?: {[header: string]: string};
      statusCode?: number;

      code?: string;
    };

    class AifiError extends Error {
      constructor(rawError: AifiRawError);

      static generate(
        rawError: AifiRawError & {type: 'E_UNAUTHORIZED'}
      ): AifiAuthenticationError;
      static generate(rawError: AifiRawError & {type: RawErrorType}): AifiError;

      /**
       * A human-readable message giving more details about the error.
       */
      readonly message: string;

      readonly type: keyof Errors;

      readonly rawType: RawErrorType;

      /**
       * Typically a 4xx or 5xx.
       */
      readonly statusCode?: number;

      readonly raw: unknown;

      readonly headers: {
        [key: string]: string;
      };
    }

    /**
     * Authentication errors typically occur when you request an API endpoint
     * with an invalid token
     */
    class AifiAuthenticationError extends AifiError {
      readonly type: 'AifiAuthenticationError';
      readonly rawType: 'E_UNAUTHORIZED';
    }
  }
}
