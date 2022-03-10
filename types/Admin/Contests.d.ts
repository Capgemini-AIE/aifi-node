declare module 'aifi' {
  namespace Aifi {
    namespace Admin {
      interface PaginatedOrderParams {
        page: string;
        pageSize: string;
        orderId: number;
        startTime: number;
        endTime: number;
        storeId: number;
        status: string[];
      }

      interface ContestedOrderCreateParams {
        orderId: number;
        message: string;
        items: Item[];
      }

      interface Item {
        id: number;
        productId: number;
        contestedQuantity: number;
      }

      interface ContestsSuccessResponse {
        contestedOrders: Aifi.Models.ContestedOrder[];
        pagination: Aifi.Models.PaginationResponse;
      }

      class ContestsResource {
        /**
         * Contests Method Type Constructs.
         */
        create(
          params: CreateContestedOrderParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<ContestsSuccessResponse>>;

        retrieve(
          params: PaginatedOrderParams,
          options?: RequestOptions
        ): Promise<Aifi.Response<ContestsSuccessResponse>>;
      }
    }
  }
}
