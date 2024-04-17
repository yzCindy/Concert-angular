
/** 訂單interface */
export interface Order {
  id: number;
  userId: number;
  concertId: number;
  quantity: number;
  totalPrice: number;
  isCancelled: boolean;
  createdAt: Date;
}


/** 訂單與演唱會資訊interface*/
export interface OrderAndConcert {
  orderId: number;
  concertId: number;
  quantity: number;
  totalPrice: number;
  isCancelled: boolean;
  /**下訂單日期 */
  createdAt: Date;
  concertName: string;
  /**節目日期 */
  concertTime: Date;
  address: string;
  /**單價 */
  price: number;
}


/** 創建訂單response*/
export interface OrderResponse {
  status: string;
  message: string;
}

/**查詢管理者擁有的訂單response */
export interface ManageOrderResponse {
  status: string;
  message: string;
  list: OrderAndConcert[];
  totalPages: number;
  totalData: number;

}

/**查詢使用者訂單response */
export interface UserOrderResponse {
  status: string;
  message: string;
  list: OrderAndConcert[];
  totalPages: number;
  totalData: number;
}

/**取消訂單response */
export interface CancelledOrderResponse {
  status: string;
  message: string;
}
