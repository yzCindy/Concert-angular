import { Component } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NzCarouselModule,
    NzButtonModule,
    RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  array = [1, 2, 3, 4];
}
