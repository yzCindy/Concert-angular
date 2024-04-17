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
import { Router } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

//service
import { ConcertsService } from './../../../services/concerts.service';

//interface
import { Concerts } from './../../../models/concerts-response';


//environment
import { concertStatus } from '../../../../environments/environment';

@Component({
  selector: 'app-concert-management',
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
    NzMessageModule,
    NzEmptyModule
  ],
  templateUrl: './concert-management.component.html',
  styleUrl: './concert-management.component.css'
})
export class ConcertManagementComponent implements OnDestroy, OnInit {
  quantity = 10;
  concertArray: Concerts[] = [];
  modifyBtn = false;
  saleStatus = concertStatus;
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


  constructor(
    public concertsService: ConcertsService,
    private router: Router,
    private msg: NzMessageService
  ) {
    this.subscription = this.concertsService.deleteConcert$.subscribe(
      () => {
        this.getData();
      }
    )

  }

  addConcertBtnFn() {
    this.router.navigateByUrl('/concert-management/create')
  }


  goModify(id: number): void {
    this.router.navigateByUrl(`/concert-management/${id}`)
  }

  goDelete(id: number): void {
    this.concertsService.deleteConcert(id).subscribe(
      response => {
        if (response.status == 'ok') {
          // 刪除成功後檢查當前頁是否為空，如果為空且不是第一頁，則將當前頁碼減1
          if (this.concertArray.length === 1 && this.currentPage !== 1) {
            this.currentPage--;
          }
          this.concertsService.deleteAction(true);
          this.msg.info(response.message);
        } else {
          this.msg.error(response.message);
        }
      }
    )
  }

  getData() {
    this.concertsService.manageConcert(this.currentPage - 1, this.pageSize).subscribe(
      response => {
        if (response.message == "查詢成功") {
          this.concertArray = response.list;
          this.totalPages = response.totalPages;
          this.totalData = response.totalData;
          this.isLoading = false;
        } else if (response.message == "尚無資料") {
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
    this.getData();
  }



  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
