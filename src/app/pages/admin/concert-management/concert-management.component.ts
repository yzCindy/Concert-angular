import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-concert-management',
  standalone: true,
  imports: [ NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule,
    NgFor,
    NzPaginationModule
  ],
  templateUrl: './concert-management.component.html',
  styleUrl: './concert-management.component.css'
})
export class ConcertManagementComponent {
  quantity=10;
  array = [1, 2, 3, 4,5,6,7,8,9,10];

}
