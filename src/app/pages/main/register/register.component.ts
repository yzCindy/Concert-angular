
import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';


//引用表單控制
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

//environment
import { levelName } from '../../../../environments/environment';

//interface
import { RegisterRequest } from '../../../models/user-request';

//service
import { UserService } from '../../../services/user.service';
import { CustomValidatorsService } from '../../../services/custom-validators.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzInputModule,
    NzIconModule,
    NzMessageModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  //控制填寫密碼時是否可見
  passwordVisible = true;
  password?: string;

  validateForm: FormGroup<{
    name: FormControl<string>;
    phone: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirm: FormControl<string>;
    address: FormControl<string>;
    level: FormControl<string>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {
      //驗證成功，且值可以是null，如果不為null則塞進去
      const email = this.validateForm.get('email')?.value;
      const password = this.validateForm.get('password')?.value;
      const level = this.validateForm.get('level')?.value;
      const name = this.validateForm.get('name')?.value;
      const phone = this.validateForm.get('phone')?.value;
      const address = this.validateForm.get('address')?.value;

      let registerData: RegisterRequest = {
        email: email ?? '',
        //如果是NULL或是undefined就會選後面的
        password: password || '',
        level: parseInt(level || levelName.user.toString()),
        name: name || '',
        phone: phone || '',
        address: address || ''
      }

      this.userService.registerFn(registerData).subscribe(
        response => {
          //註冊成功需重新登入
          if (response && response.token != null) {
            localStorage.setItem('token', response.token);
            this.message.success(`${response.message}，請重新登入`);
            this.router.navigateByUrl('/login');
          } else {
            //後端註冊失敗會留在原頁面並顯示錯誤訊息
            this.message.error(response.message);
          }
        }
      )
    } else {
      //前端驗證失敗
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // /**立即啟用密碼驗證的功能 */
  // validateConfirmPassword(): void {
  //   setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  // }

  /**驗證再次確認的密碼是否相同 */
  confirmValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true };
    }
    return {};
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private customValidators: CustomValidatorsService,
    private router: Router,
    private message: NzMessageService) {

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, customValidators.phone]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, customValidators.passwordValidator]],
      confirm: ['', [this.confirmValidator]],
      address: ['', [Validators.required]],
      level: [levelName.user.toString(), [Validators.required]],

    });
  }



}
