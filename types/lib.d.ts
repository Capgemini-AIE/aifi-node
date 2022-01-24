/// <reference lib="esnext.asynciterable" />
/// <reference types="node" />

import {Agent} from 'http';

declare module 'aifi' {
  namespace Aifi {
    type AifiResourceClass = typeof AifiResource;

    interface AifiResourceExtension<T extends object>
      extends AifiResourceClass {
      new (aifi: Aifi): AifiResource & T;
    }

    export class AifiResource {
      static extend<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        T extends {[prop: string]: any} & {
          includeBasic?: Array<
            'create' | 'retrieve' | 'update' | 'list' | 'del'
          >;
        }
      >(spec: T): AifiResourceExtension<T>;
      static method<ResponseObject = object>(spec: {
        method: string;
        path?: string;
        fullPath?: string;
        methodType?: 'list' | 'search';
      }): (...args: any[]) => Response<ResponseObject>;
    }

    export type HttpAgent = Agent;
    export type HttpProtocol = 'http' | 'https';

    export interface AifiConfig {
      /**
       * Use a custom http(s) agent.
       * Useful for making requests through a proxy.
       */
      httpAgent?: HttpAgent;

      /**
       * Use a custom http client, rather than relying on Node libraries.
       * Useful for making requests in contexts other than NodeJS (eg. using
       * `fetch`).
       */
      httpClient?: HttpClient;

      /**
       * Request timeout in milliseconds.
       * The default is 80000
       */
      timeout?: number;

      host?: string;

      port?: string | number;

      protocol?: HttpProtocol;
    }

    export interface RequestOptions {
      /**
       * Use a specific API Key for this request.
       */
      apiKey?: string;

      /**
       * Specify a timeout for this request in milliseconds.
       */
      timeout?: number;
    }

    export type Response<T> = T & {
      lastResponse: {
        headers: {[key: string]: string};
        statusCode: number;
      };
    };

    /**
     * The Aifi API uses url-encoding for requests, and aifi-node encodes a
     * `null` param as an empty string, because there is no concept of `null`
     * in url-encoding. Both `null` and `''` behave identically.
     */
    export type Emptyable<T> = null | '' | T;

    export interface RequestEvent {
      method: string;
      path: string;
    }

    export interface ResponseEvent {
      method: string;
      path: string;
      status: number;
    }

    export type AifiStreamResponse = NodeJS.ReadableStream;
  }
}
