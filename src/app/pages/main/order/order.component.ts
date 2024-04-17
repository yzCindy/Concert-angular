
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

//service
import { OrderService } from '../../../services/order.service';

//interface
import { OrderAndConcert } from '../../../models/order-response';



@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule,
    NgFor, NgIf,
    NzPaginationModule,
    NzModalModule,
    CommonModule,
    NzSpinModule,
    NzIconModule,
    NzMessageModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, OnDestroy {

  orderArray: OrderAndConcert[] = [];
  subscription: Subscription;
  isLoading = true;

  /**每頁呈現的數據量 */
  pageSize = 5;
  /**現在的分頁 */
  currentPage = 1;
  /**總分頁數 */
  totalPages = 0;
  /**總訂單數 */
  totalData = 0;

  constructor(private orderService: OrderService,
    private msg: NzMessageService) {
    this.getOrderData();
    this.subscription = this.orderService.cancelledConcert$.subscribe(
      () => {
        this.getOrderData();
      }
    )
  }

  cancelledOrder(orderId: number) {
    this.orderService.cancelledOrder(orderId).subscribe(
      response => {
        if (response.status == 'ok') {
          this.msg.success(response.message)
        }
        else {
          this.msg.error(response.message)
        }
      }
    )

  }

  getOrderData() {
    this.orderService.findUserOrder(this.currentPage - 1, this.pageSize).subscribe(
      response => {
        if (response.message == "查詢成功") {
          this.orderArray = response.list;
          this.totalPages = response.totalPages;
          this.totalData = response.totalData;
          this.isLoading = false;
        } else if (response.message == "尚無訂單") {
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.msg.error(response.message)
        }
      }
    )
  }

  // 處理分頁
  onPageIndexChange(page: number) {
    this.currentPage = page;
    this.getOrderData();
  }



  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
