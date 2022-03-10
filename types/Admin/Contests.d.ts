declare module 'aifi' {
  namespace Aifi {
    namespace Admin {
      interface ContestedOrdersParams {
        page: string;
        pageSize: string;
        orderId: number;
        startTime: number;
        endTime: number;
        storeId: number;
        status: Status;
      }

      type Status = ['contested' | 'reviewed'];

      interface ContestsSuccessResponse {
        contestedOrders: Aifi.Models.ContestedOrder[];
        pagination: Aifi.Models.PaginationResponse;
      }

      class ContestsResource {
        /**
         * Retrieves an auth token.
         */
        retrieveToken(
          params: ContestedOrdersParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<ContestsSuccessResponse>>;
      }
    }
  }
}
