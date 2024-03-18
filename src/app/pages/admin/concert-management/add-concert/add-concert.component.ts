import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NzUploadModule, NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { Observable, Observer } from 'rxjs';


import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';


import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-concert',
  standalone: true,
  imports: [
    CommonModule,
    NzUploadModule,
    NzFormModule,
    ReactiveFormsModule,
    NzFormModule,
    NzAutocompleteModule,
    FormsModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
    NzTypographyModule,
    NzDatePickerModule,
    NzIconModule,
    NzButtonModule,
    NzSelectModule,
    NgFor
  ],
  templateUrl: './add-concert.component.html',
  styleUrl: './add-concert.component.css'
})
export class AddConcertComponent {
  defaultFileList: NzUploadFile[] = [
  ];

  fileList1 = [...this.defaultFileList];

  selectedValue = null;
  saleQuantityList :string[] = ['100','500','1000','3000','5000','1w','1w5','2w'];

  validateForm: FormGroup<{
    concertName: FormControl<string>;
    concertTime: FormControl<string>;
    address: FormControl<string>;
    information: FormControl<string>;
    saleTime: FormControl<string>;
    price:FormControl<string>;
    saleQuantity:FormControl<string>;
  }>;


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('請上傳jpg檔或png檔');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('請選擇低於2MB的圖片');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList1 = fileList;
  }



  constructor(private fb: NonNullableFormBuilder, private msg: NzMessageService) {
    this.validateForm = this.fb.group({
      concertName: ['', [Validators.required]],
      concertTime: ['', [Validators.required]],
      address: ['', [Validators.required]],
      information: ['', [Validators.required]],
      saleTime: ['', [Validators.required]],
      price: ['', [Validators.required]],
      saleQuantity:['', [Validators.required]]
    });
  }

}
