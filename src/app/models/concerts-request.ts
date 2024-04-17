/**新增節目request */
export interface ConcertRequest {
  concertName: string;
  concertTime: Date;
  information: string;
  address: string;
  saleTime: Date;
  price: number;
  saleQuantity: number;
  remaingQuantity: number;
  contentType:string;
  image:string;
  /** 活動狀態
 *  0 下架中 / 1 上架中 /2 已售完
 */
  status: number;
  createdAt:Date;

}


/**修改節目request */
export interface ConcerModifyRequest {
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
