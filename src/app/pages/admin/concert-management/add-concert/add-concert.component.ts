import { CommonModule,NgFor } from '@angular/common';
import { Component} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, NonNullableFormBuilder,FormsModule } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzUploadFile, NzUploadChangeParam, NzUploadModule} from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDatePickerModule, DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { differenceInCalendarDays, addDays } from 'date-fns';
import { Router } from '@angular/router';

//service
import { ConcertsService } from '../../../../services/concerts.service';

//interface
import { ConcertRequest } from '../../../../models/concerts-request';

//environment
import { concertStatus,environment,ticketsRange } from '../../../../../environments/environment';

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
    NgFor,
    NzDividerModule,
    NzCardModule
  ],
  templateUrl: './add-concert.component.html',
  styleUrl: './add-concert.component.css'
})
export class AddConcertComponent {

  image = '';
  imageContentType='';

  //照片上傳api
  Img_API_URL = `${environment.API_URL}/concert/img`;

  defaultFileList: NzUploadFile[] = [
  ];
  photo = [...this.defaultFileList];

  saleQuantityList: string[] = ticketsRange.range;

  validateForm: FormGroup<{
    concertName: FormControl<string>;
    concertTime: FormControl<string>;
    address: FormControl<string>;
    information: FormControl<string>;
    saleTime: FormControl<string>;
    price: FormControl<string>;
    saleQuantity: FormControl<string>;
  }>;

  //====處理表單日期====
  tomorrow = addDays(new Date(), 1);
  dayAfterTomorrow = addDays(new Date(), 2);
  //售票不可選的日期
  disabledDate = (current: Date): boolean =>
    // 不能選擇比明天還小的日期
    (differenceInCalendarDays(current, this.tomorrow)) < 0;

  //====處理表單時間====
  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  //售票不可選的時間
  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => [...this.range(0, 7), ...this.range(23, 24)],
    nzDisabledMinutes: () => [...this.range(1, 30), ...this.range(31, 60)],
    nzDisabledSeconds: () => this.range(1, 60)
  });

  //活動不可選的日期

  activityDisabledDate = (current: Date): boolean =>
    // 不能選擇
    (differenceInCalendarDays(current,this.dayAfterTomorrow)) < 0;





  //====表單送出====
  submitForm(): void {

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      if (this.image == '') {
        this.msg.error('請選擇圖片');
        return;
      }

      let addConcertData: ConcertRequest = {
        concertName: this.validateForm.get('concertName')?.value || '',
        concertTime: new Date( this.validateForm.get('concertTime')?.value || ''),
        information: this.validateForm.get('information')?.value || '',
        address: this.validateForm.get('address')?.value || '',
        saleTime: new Date(this.validateForm.get('saleTime')?.value || ''),
        price: parseInt(this.validateForm.get('price')?.value || '0'),
        saleQuantity: parseInt(this.validateForm.get('saleQuantity')?.value || '0'),
        remaingQuantity:  parseInt(this.validateForm.get('saleQuantity')?.value || '0'),
        status: concertStatus.notSale,
        image: this.image,
        contentType:this.imageContentType,
        createdAt:new Date()
      }
      console.log(addConcertData)
      if(addConcertData!=null){
        this.concertsService.addConcert(addConcertData).subscribe(
          response=>{
            if (response.status == 'ok' ){
              this.msg.success(response.message);
              this.router.navigateByUrl('/concert-management')

            }
          }


        )
      }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  //====處理圖片上傳====

  /**
   * 照片上傳前驗證
   */
  beforeUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
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
  /**
   * 1.限制圖片上傳數量，只能上傳一張，且只保留最後上傳的照片
   * 2.將請求結果的圖片名稱放置於image屬性
   */
  handleChange(info: NzUploadChangeParam): void {
    let photo = info.fileList;
    photo = photo.slice(-1);
    if (photo) {
      this.photo = photo;
      if (info.file.status === 'done') {
        this.image = this.photo[0].response.imgName;
        this.imageContentType=info.file.type ||'';
        this.msg.success(`${info.file.name} ${this.photo[0].response.message}`);
      } else if (info.file.status === 'error') {
        this.msg.error(`${info.file.name} ${this.photo[0].response.message}`);
      }
    }
  }


  //====返回按鈕====
  backForm(): void {
    this.router.navigateByUrl('/concert-management')

  }


  constructor(
    private fb: NonNullableFormBuilder,
    private msg: NzMessageService,
    private concertsService:ConcertsService,
    private router:Router
    ) {
    this.validateForm = this.fb.group({
      concertName: ['', [Validators.required]],
      concertTime: ['', [Validators.required]],
      address: ['', [Validators.required]],
      information: ['', [Validators.required]],
      saleTime: ['', [Validators.required]],
      price: ['', [Validators.required]],
      saleQuantity: ['', [Validators.required]],
    });
  }


}
