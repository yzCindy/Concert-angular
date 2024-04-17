import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzUploadFile, NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
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
import { Router, ActivatedRoute } from '@angular/router';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { differenceInCalendarDays, addDays } from 'date-fns';

//service
import { ConcertsService } from '../../../../services/concerts.service';

//interface
import { ConcerModifyRequest } from '../../../../models/concerts-request';
import { Concerts } from './../../../../models/concerts-response';


//environment
import { ticketsRange, concertStatus, environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-modify-concert',
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
    NzCardModule,
    NzRadioModule
  ],
  templateUrl: './modify-concert.component.html',
  styleUrl: './modify-concert.component.css'
})
export class ModifyConcertComponent implements OnInit {

  image = '';
  imageContentType = '';

  //照片上傳api
  Img_API_URL = `${environment.API_URL}/concert/img`;


  defaultFileList: NzUploadFile[] = [
  ];
  photo = [...this.defaultFileList];

  saleQuantityList: string[] = ticketsRange.range;
  saleStatus = concertStatus;
  validateForm: FormGroup<{
    concertName: FormControl<string>;
    concertTime: FormControl<string>;
    address: FormControl<string>;
    information: FormControl<string>;
    saleTime: FormControl<string>;
    price: FormControl<string>;
    saleQuantity: FormControl<string>;
    status: FormControl<string>;
  }>;

  concert: Concerts = {
    id: 0,
    userId: 0,
    concertName: '',
    concertTime: new Date(),
    information: '',
    address: '',
    saleTime: new Date(),
    price: 0,
    saleQuantity: 0,
    remaingQuantity: 0,
    contentType: '',
    image: '',
    status: 0
  };


  radioValue = '';

  //從路由取出資訊
  getConcert(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.concertsService.searchConcert(id).subscribe(
      response => {

        this.concert = response.concert

        //為表單控制項增加初始值
        this.validateForm.patchValue(
          {
            concertName: response.concert.concertName,
            concertTime: response.concert.concertTime.toString(),
            information: response.concert.information.toString(),
            address: response.concert.address,
            saleTime: response.concert.saleTime.toString(),
            price: response.concert.price.toString(),
            saleQuantity: response.concert.saleQuantity.toString(),
            status: response.concert.status.toString(),

          }
        )
      }

    )
  }




  //========處理表單日期========
  tomorrow = addDays(new Date(), 1);
  dayAfterTomorrow = addDays(new Date(), 2);

  //售票不可選的日期
  disabledDate = (current: Date): boolean =>
    // 不能選擇比明天還小的日期
    (differenceInCalendarDays(current, this.tomorrow)) < 0;

  //活動不可選的日期
  activityDisabledDate = (current: Date): boolean =>
    (differenceInCalendarDays(current, this.dayAfterTomorrow)) < 0;





  //========處理表單時間========
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




  //========表單送出========
  submitForm(): void {

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      let modifyConcertData: ConcerModifyRequest = {
        id: this.concert.id || 0,
        userId: this.concert.userId || 0,
        concertName: this.validateForm.get('concertName')?.value || '',
        concertTime: new Date(this.validateForm.get('concertTime')?.value || ''),
        information: this.validateForm.get('information')?.value || '',
        address: this.validateForm.get('address')?.value || '',
        saleTime: new Date(this.validateForm.get('saleTime')?.value || ''),
        price: parseInt(this.validateForm.get('price')?.value || '0'),
        saleQuantity: parseInt(this.validateForm.get('saleQuantity')?.value || '0'),
        remaingQuantity: parseInt(this.validateForm.get('saleQuantity')?.value || '0'),
        status: parseInt(this.validateForm.get('status')?.value || '0'),
        image: this.image != '' ? this.image : '',
        contentType: this.imageContentType != '' ? this.imageContentType : this.concert.contentType
      }

      if (modifyConcertData != null) {
        this.concertsService.modifyConcert(modifyConcertData).subscribe(
          response => {
            if (response.status == 'ok') {
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
   * 1.限制圖片上傳數
   * 2.將請求結果的圖片名稱放置於image屬性
   */
  handleChange(info: NzUploadChangeParam): void {
    let photo = info.fileList;
    //提取陣列的最後一個值，使得照片將保留最後上傳的照片
    photo = photo.slice(-1);
    if (photo) {
      this.photo = photo;
      if (info.file.status === 'done') {
        console.log(info.file)
        this.image = this.photo[0].response.imgName;
        this.imageContentType = info.file.type || '';
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
    private concertsService: ConcertsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.validateForm = this.fb.group({
      concertName: ['', [Validators.required]],
      concertTime: ['', [Validators.required]],
      address: ['', [Validators.required]],
      information: ['', [Validators.required]],
      saleTime: ['', [Validators.required]],
      price: ['', [Validators.required]],
      saleQuantity: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });


  }
  ngOnInit(): void {
    this.getConcert()
  }

}


