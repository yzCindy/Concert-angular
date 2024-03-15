import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { WelcomeComponent } from './pages/main/welcome/welcome.component';
import { SearchComponent } from './pages/main/search/search.component';
import { LoginComponent } from './pages/main/login/login.component';
import { UserComponent } from './pages/main/user/user.component';
import { OrderComponent } from './pages/main/order/order.component';
import { SearchDetailComponent } from './pages/main/search/search-detail/search-detail.component';
import { RegisterComponent } from './pages/main/register/register.component';
import { OrderManagementComponent } from './pages/admin/order-management/order-management.component';
import { ConcertManagementComponent } from './pages/admin/concert-management/concert-management.component';


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
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'concert';


}
