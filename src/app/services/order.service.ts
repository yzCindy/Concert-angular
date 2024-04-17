
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

//interface
import { OrderRequest } from '../models/order-request';
import { CancelledOrderResponse, ManageOrderResponse, OrderResponse, UserOrderResponse } from '../models/order-response';

//environment
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient) { }


  private Order_API_URL = `${environment.API_URL}/order`;
  private ManageOrder_API_URL = `${environment.API_URL}/order/manage`;
  private UserOrder_API_URL = `${environment.API_URL}/order/info`;
  private CancelledOrder_API_URL = `${environment.API_URL}/order/modify`;


  //建立可監聽是否有取消訂單的行為
  private cancelledSource = new Subject<boolean>();
  cancelledConcert$ = this.cancelledSource.asObservable();
  cancelledAction(go: boolean) {
    this.cancelledSource.next(go);
  }



  /**POST:新增訂單 */
  addOrder(request: OrderRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    return this.http.post<OrderResponse>(this.Order_API_URL, request, { headers })
  }

  /**GET:查詢管理者擁有的訂單 */
  findManageOrder(page: number, size: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ManageOrderResponse>(this.ManageOrder_API_URL, { params, headers })
  }

  /**GET:查詢使用者擁有的訂單 */
  findUserOrder(page: number, size: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<UserOrderResponse>(this.UserOrder_API_URL, { params, headers })
  }




  /**取消訂單 */
  cancelledOrder(orderId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('orderId', orderId.toString());
    return this.http.put<CancelledOrderResponse>(this.CancelledOrder_API_URL, null, {
      params,
      headers
    }).pipe(
      tap(() => this.cancelledAction(true))
    )
  }

}
