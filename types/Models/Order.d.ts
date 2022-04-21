declare module 'aifi' {
  namespace Aifi {
    namespace Models {
      /**
       * The Customer object.
       */
      interface Order {
        /**
         * Unique identifier for the object.
         */
        id: string;

        /**
         * Graphql identifier for the object.
         */
        graphQlId: string;

        /**
         * Order number
         */
        orderNumber: string;

        /**
         * Is the order been fully paid?
         */
        fullyPaid: boolean;

        /**
         * Is the tax included?
         */
        taxesIncluded: boolean;

        /**
         * Subtotal price
         */
        subtotalPrice: string;

        /**
         * The time was the order processed
         */
        processedAt: string;

        /**
         * Currency code
         */
        currencyCode: string;

        /**
         * Total price of the order.
         */
        totalPrice?: string;

        /**
         * Id of the customer the order belongs to
         */
        customerId: string;

        /**
         * The customer's phone number.
         */
        phonsubtotalPricee?: string;

        /**
         * A reference to a unique external identified for the customer.
         */
        totalTax?: string;

        /**
         * Total discount applied to order
         */
        totalDiscounts: string;

        /**
         * A reference to a unique external identified for the customer.
         */
        totalRefunded: string;

        /**
         * LineItems Object Array
         */
        lineItems: LineItem[];

        /**
         * Current order line items count
         */
        lineItemsCount: number;

        /**
         * If there are more than 20 line items boolean
         */
        moreThan20LineItems: boolean;

        /**
         * A reference to a unique external identified for the customer.
         */
        status: Status.OrderDetail;

        /**
         * Time and date the order was created at
         */
        createdAt: string;

        /**
         * Total CRV tax
         */
        totalCRVTax: number;

        /**
         * Customers first name associated with order
         */
        customerFirstName: string;

        /**
         * Customers last name associated with order
         */
        customerLastName: string;
      }

      /**
       * LineItem Object
       */
      interface LineItem {
        /**
         * Unique identifier for order.
         */
        orderId?: string;

        /**
         * The state of the current order either
         */
        status?: Status.LineItem;

        /**
         * Quantity for LineItem
         */
        quantity?: number;

        /**
         * Total price for LineItem including multiple Qty.
         */
        totalPrice?: string;

        /**
         * Image url for LineItem
         */
        image?: string;

        // TODO what is rin?
        rin?: string;
      }

      namespace Status {
        type OrderDetail = 'paid' | 'draft';
        type LineItem = 'contested' | 'reviewed' | 'original';
      }

      /**
       * The Payment Details Object
       */
      interface PaymentDetails {
        /**
         * Unique identifier for order.
         */
        orderId?: string;

        /**
         * Success or failure state of the order
         */
        success?: boolean;

        /**
         * Total amount for current order
         */
        amount?: string;
      }
    }
  }
}
