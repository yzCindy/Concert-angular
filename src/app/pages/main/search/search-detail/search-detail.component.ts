import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule],
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.css'
})
export class SearchDetailComponent {
  quantity=10
  }
