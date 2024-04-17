import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgIf } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';



//service
import { UserService } from '../../../services/user.service';
import { CustomValidatorsService } from '../../../services/custom-validators.service';

//interface
import { UserInfoResponse } from './../../../models/user-response';
import { UpdateUserRequest } from '../../../models/user-request';




@Component({
  selector: 'app-user',
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
    NgIf,
    NzMessageModule,
    NzIconModule,
    NzInputModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnDestroy, OnInit {


  // 控制是否為修改
  modify = false;
  pwdmodify = false;
  userData: UserInfoResponse = {
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  };

  modifyFn() {
    this.modify = !this.modify
  }

  getUserData() {
    this.userService.userData().subscribe(
      response => {
        console.log(response)
        this.userData = response;
        if (response.message == '查詢成功') {
          this.validateForm.patchValue({
            name: response.name,
            phone: response.phone,
            email: response.email,
            address: response.address,
          })
        }

      }

    )
  }


  validateForm: FormGroup<{
    name: FormControl<string>;
    phone: FormControl<string>;
    email: FormControl<string>;
    address: FormControl<string>;
  }>;


  submitForm(): void {
    if (this.validateForm.valid) {
      this.userData.name = this.validateForm.get('name')?.value ||'';
      this.userData.phone = this.validateForm.get('phone')?.value ||'';
      this.userData.address = this.validateForm.get('address')?.value ||'';
      let request:UpdateUserRequest={
        name: this.userData.name,
        phone: this.userData.phone,
        address:this.userData.address
      }
      this.userService.updateData(request).subscribe(
        response=>{
          if(response.status=="ok"){
            this.message.success(response.message)
            this.userService.updateUser(response);
            this.modifyFn();
          }else{
          this.message.error(response.message)
          }
        }
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private customValidators: CustomValidatorsService,
    private message: NzMessageService) {

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, customValidators.phone]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {
    this.getUserData()
  }


  ngOnDestroy(): void {

  }
}

