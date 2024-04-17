/** 節目interface*/
export interface Concerts {
  id: number;
  userId: number;
  concertName: string;
  concertTime: Date;
  information: string;
  address: string;
  saleTime: Date;
  price: number;
  saleQuantity: number;
  remaingQuantity: number;
  contentType:string;
  image: string;
  status: number;

}

/**創建節目response */
export interface CreateConcertResponse {
  status: string;
  message: string;
}


/**修改節目response */
export interface ModifyConcertResponse {
  status: string;
  message: string;
}


/**管理者查詢可管理節目response */
export interface ManageConcertResponse {
  list: Concerts[];
  message: string;
  totalPages: number;
  totalData: number;
}



/**查詢可販售的節目response
 * 此節目範圍為，狀態非未販售，
 * 且節目日期未到期的節目
*/

export interface SearchSaleConcertResponse {
  list: Concerts[];
  message: string;
}


/**查詢單一節目response */
export interface ConcertSearchResponse {
  concert: Concerts;
  message: string;
}
