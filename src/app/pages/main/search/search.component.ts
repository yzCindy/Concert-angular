import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgFor } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';


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
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  array = [1, 2, 3, 4,5,6,7,8,9,10];




}
