import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSpinModule } from 'ng-zorro-antd/spin';

//service
import { ConcertsService } from './../../../services/concerts.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NzCarouselModule,
    NzButtonModule,
    RouterLink,
    NgIf,
    NzSpinModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  imgArray: string[] =[];
  constructor(
    private concertsService:ConcertsService
  ) {

    this.concertsService.searchSaleConcert().subscribe(
      response=>{
        let count=0;
        response.list.forEach(element => {
          if(count < 3){
          this.imgArray.push(element.image);
          count++;
          }
        });
      }
    )
  }
}
