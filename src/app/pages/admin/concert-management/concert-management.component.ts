import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NgFor,NgIf } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AddConcertComponent } from './add-concert/add-concert.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-concert-management',
  standalone: true,
  imports: [ NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule,
    NgFor,NgIf,
    NzPaginationModule,
    AddConcertComponent,
    NzModalModule
  ],
  templateUrl: './concert-management.component.html',
  styleUrl: './concert-management.component.css'
})
export class ConcertManagementComponent {
  quantity=10;
  array = [1, 2, 3, 4,5,6,7,8,9,10];
  addConcertBtn=false;
  modifyBtn=false;


  addConcertBtnFn(){
    this.addConcertBtn=! this.addConcertBtn;
  }


  isVisible = false;

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
