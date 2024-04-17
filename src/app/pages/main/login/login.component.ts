//引入組件
import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

//environment
import { levelName } from '../../../../environments/environment';

//表單控制模組
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

//引入服務
import { UserService } from '../../../services/user.service';
import { CustomValidatorsService } from '../../../services/custom-validators.service';

//引入Interface
import { LoginRequest } from '../../../models/user-request';

//引入路由
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzCardModule,
    NzDividerModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzMessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  //控制密碼是否能見
  passwordVisible = true;
  password?: string;


  //宣告驗證控制項，是一個Fromgroup物件，並說明包含的表單控制項型別
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>


  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private customValidatorsService: CustomValidatorsService,
    private router: Router,
    private message: NzMessageService
  ) {
    //透過FormBuilder去建立FormGroup表單物件
    this.validateForm = this.fb.group({
      //控制email不能為空，並符合email的格式
      email: ['', [Validators.required, Validators.email]],
       //控制assword不能為空，並符合自訂的password驗證格式
      password: ['', [Validators.required, this.customValidatorsService.passwordValidator]]
    })
  }

  ngOnInit(): void {

  }



  submitForm(): void {
    if (this.validateForm.valid) {
      const email = this.validateForm.get('email')?.value;
      const password = this.validateForm.get('password')?.value;
      /**放入請求參數 */
      let loginRequest: LoginRequest = {
        email: email || '',
        password: password || ''
      }
      this.userService.loginFn(loginRequest).subscribe(
        response => {
          if (response && response.token != null) {
            //將回傳的token放入localStorage
            localStorage.setItem('token', response.token);
            //辨別使用者角色
            if (response.level == levelName.user) {
              this.userService.level = levelName.user
            } else if (response.level == levelName.manager) {
              this.userService.level = levelName.manager
            } else {
              this.userService.level = levelName.none
            }
            //傳送登入訊息給監聽者
            this.userService.loginUser(response);
            this.message.success(response.message);
            this.router.navigateByUrl('/welcome');
          } else {
            this.message.error(response.message);
          }

        }
      )
    } else {
      //驗證失敗，則顯示錯誤訊息，並重新驗證
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


}
