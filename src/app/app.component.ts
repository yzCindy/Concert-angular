import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

//component
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './pages/main/welcome/welcome.component';
import { SearchComponent } from './pages/main/search/search.component';
import { LoginComponent } from './pages/main/login/login.component';
import { UserComponent } from './pages/main/user/user.component';
import { OrderComponent } from './pages/main/order/order.component';
import { SearchDetailComponent } from './pages/main/search/search-detail/search-detail.component';
import { RegisterComponent } from './pages/main/register/register.component';
import { OrderManagementComponent } from './pages/admin/order-management/order-management.component';
import { ConcertManagementComponent } from './pages/admin/concert-management/concert-management.component';

//service
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NzLayoutModule,
    WelcomeComponent,
    SearchComponent,
    LoginComponent,
    UserComponent,
    OrderComponent,
    SearchDetailComponent,
    RegisterComponent,
    OrderManagementComponent,
    ConcertManagementComponent,
    RouterModule,
    NzMessageModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'concert';
  token = localStorage.getItem('token');
  constructor(
    private userService: UserService,
    private msg: NzMessageService,) {

    if (this.token) {
      this.userService.autoLogin(this.token).subscribe(
        response => {
          if(response.message == '驗證成功'){
          this.userService.loginUser(response)
          this.msg.success('登入成功')
          }else{
            this.msg.error(response.message)
          }
        }
      )
    }


  }


  ngOnInit(): void {



  }

}
