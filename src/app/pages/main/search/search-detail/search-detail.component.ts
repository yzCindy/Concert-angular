import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

//service
import { OrderService } from '../../../../services/order.service';
import { ConcertsService } from '../../../../services/concerts.service';

//interface
import { OrderRequest } from '../../../../models/order-request';
import { Concerts } from '../../../../models/concerts-response';


@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule,
    CommonModule,
    NzSpinModule
  ],
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.css'
})


export class SearchDetailComponent implements OnInit {
  loading = false;

  //初始值
  concert: Concerts = {
    id: 0,
    userId: 0,
    concertName: '',
    concertTime: new Date(),
    information: '',
    address: '',
    saleTime: new Date(),
    price: 0,
    saleQuantity: 0,
    remaingQuantity: 0,
    contentType: '',
    image: '',
    status: 0
  };
  orderQuantity: number = 10;
  token: string = localStorage.getItem('token') || '';

  constructor(
    private msg: NzMessageService,
    private concertsService: ConcertsService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
  getConcert(): void {
    //取得路由的參數
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //呼叫service取得Concert資料
    this.concertsService.searchConcert(id).subscribe(
      response => {
        this.concert = response.concert;
        this.loading = true;
      }
    )
  }

  orderConcert() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let request: OrderRequest = {
      concertId: id,
      orderQuantity: this.orderQuantity
    }
    this.orderService.addOrder(request).subscribe(
      response => {
        if (response.status == 'ok') {
          this.msg.success(response.message);
          this.router.navigateByUrl('/order');
        } else {
          this.msg.error(response.message);
          return
        }
      }

    )
  }

  ngOnInit(): void {
    this.getConcert()
  }

}
