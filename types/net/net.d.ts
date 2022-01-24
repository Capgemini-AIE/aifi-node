/// <reference types="node" />

import {IncomingMessage} from 'http';
declare module 'aifi' {
  namespace Aifi {
    /**
     * Encapsulates the logic for issuing a request to the Aifi API.
     */
    export interface HttpClient<
      ResponseType extends HttpClientResponse = HttpClientResponse
    > {
      /** The client name to use for diagnostics. */
      getClientName(): string;

      makeRequest(
        host: string,
        port: string | number,
        path: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        // object is used here as this is implementation-specific. This is
        // generally {[key: string]: string}, but various underlying clients
        // support other types as well. As examples:
        // - Node supports {[key: string]: string | number | string[]}.
        // - Fetch supports a Headers object.
        headers: object,
        requestData: string | null,
        protocol: Aifi.HttpProtocol,
        timeout: number
      ): Promise<ResponseType>;
    }

    /**
     * Abstract representation of an HTTP response. This is an experimental
     * interface and is not yet stable.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface HttpClientResponse<RawResponseType = any, StreamType = any> {
      /** The numeric HTTP status code for the response. */
      getStatusCode(): number;

      /** The response headers. */
      getHeaders(): {[key: string]: string};

      /** This returns the underlying raw response object for the client. */
      getRawResponse(): RawResponseType;

      /**
       * Converts the response content into a JSON object, failing if JSON
       * couldn't be parsed.
       */
      toJSON(): Promise<object>;
    }

    export const createNodeHttpClient: (
      agent?: HttpAgent | null
    ) => HttpClient<
      HttpClientResponse<IncomingMessage, Aifi.AifiStreamResponse>
    >;
  }
}
