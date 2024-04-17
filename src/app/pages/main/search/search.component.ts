import { Component, OnDestroy } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgFor,CommonModule  } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Router, RouterLink  } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';

//service
import { ConcertsService } from './../../../services/concerts.service';

//interface
import { Concerts } from '../../../models/concerts-response';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NzCardModule,
    NgFor,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    RouterLink,
    CommonModule,
    NzSpinModule,
    NzDividerModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnDestroy {
  concertArray: Concerts[] = [];
  token: string = localStorage.getItem('token') || '';

  constructor(
    public concertsService: ConcertsService,
    private router: Router,
    private msg: NzMessageService
  ) {
    this.concertsService.searchSaleConcert().subscribe(
      response => {
        this.concertArray = response.list;

      }
    )

  }

  /**TRUE:表示是「現在時間」大於「開始販售時間」並且票餘數量不為0 */
  isSaleTime(saleTime: Date | string, remaingQuantity: number): boolean {
    if (!saleTime || !remaingQuantity) {
      return false;
    }
    const currentTime = new Date();
    const saleDate = typeof saleTime == 'string' ? new Date(saleTime) : saleTime;
    if (currentTime.getTime() > saleDate.getTime() && remaingQuantity != 0) {
      return true
    }
    else {
      return false;
    };
  }

  goOrder(id: number) {
    //要先登入才能進入訂購畫面
    if (this.token != null && this.token.length > 0) {
      this.router.navigateByUrl(`/search/${id}`);
    } else {
      this.msg.error("請先登入")
      this.router.navigateByUrl(`/login`);
    }
  }

  //透過關鍵字至後端進行查詢
  selectByKey(keyword: string) {
    this.concertsService.keySearchSaleConcert(keyword).subscribe(response => {
      if (response.list != null) {
        this.concertArray = response.list
      }
    }
    )
  }

  ngOnDestroy(): void {
  }
}
