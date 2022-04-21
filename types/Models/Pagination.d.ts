declare module 'aifi' {
  namespace Aifi {
    namespace Models {
      interface PaginatedParams {
        /**
         * Count
         */
        count?: number;

        /**
         * Sort oder ASC ascending or DESC descending
         */
        direction?: string;

        /**
         * Pagination after
         */
        after?: string;

        /**
         * Pagination before
         */
        before?: string;

        /**
         * Id of the store where the order was placed
         */
        storeId?: number;
      }

      interface PaginationResponse {
        next: Next;
        previous: Previous;
      }

      interface Next {
        after: string;
        count: number;
      }

      interface Previous {
        before: string;
        count: number;
      }
    }
  }
}
