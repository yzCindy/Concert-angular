import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { levelName } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NzMenuModule,
    NzIconModule,
    NzSwitchModule,
    FormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzCardModule,
    RouterLink,
    NgIf,
    NzPopconfirmModule,
    NzMessageModule

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  loginBtn = true;
  registerBtn = true;
  logoutBtn = false;
  subscriptionUser: Subscription;
  subscriptionUserData: Subscription;
  userBtn = false;
  manageBtn = false;
  name: string = '';

  constructor(
    public userService: UserService,
    private router: Router,
    private message: NzMessageService
  ) {
    //監聽是否有人登入，控制navbar按鈕顯示
    this.subscriptionUser = this.userService.loginUser$.subscribe(response => {

      //一般使用者
      if (response.token != null && response.level == levelName.user) {
        this.loginBtn = false;
        this.registerBtn = false;
        this.logoutBtn = true;
        this.userBtn = true;
        this.manageBtn = false;
        this.name = response.name;
        //管理者
      } else if (response.token != null && response.level == levelName.manager) {
        this.loginBtn = false;
        this.registerBtn = false;
        this.logoutBtn = true;
        this.manageBtn = true;
        this.userBtn = false;
        this.name = response.name;
      }
      //其他
      else {
        this.userService.level = levelName.none
        this.loginBtn = true;
        this.registerBtn = true;
        this.logoutBtn = false;
        this.userBtn = false;
        this.manageBtn = false;
        this.name = '';
      }
    }
    );

    //監聽是否變更會員名稱
    this.subscriptionUserData = this.userService.userUpdate$.subscribe(
      response => {
        if (response.status == "ok") {
          this.name = response.name;
        }
      }

    )


  }


  //登出按鈕功能，按鈕回到初始狀態
  logOut(): void {
    localStorage.clear();
    this.loginBtn = true;
    this.registerBtn = true;
    this.logoutBtn = false;
    this.userBtn = false;
    this.manageBtn = false;
    this.userService.level = levelName.none
    this.message.success("登出成功");
    this.router.navigateByUrl('/welcome');
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

    //解除訂閱

    if (this.subscriptionUser) {
      this.subscriptionUser.unsubscribe();
    }

    if (this.subscriptionUserData) {
      this.subscriptionUserData.unsubscribe();
    }
  }

}

