import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl
} from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

    /**驗證密碼長度
     * param:表單控制項。
     * 1.不能小於8個字元
     * 2.不能大於20個字元
     * return:判斷標示。
    */
    passwordValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true};
      } else if (control.value.length < 8 ) {
        return { min: true};
      } else if (control.value.length > 20) {
        return { max: true};
      }
      return {};
    };


    /**驗證手機格式是否正確 */
    isPhone(value: string): boolean {
      return typeof value === 'string' && /(^(09)\d{8}$)/.test(value);
    }

    phone: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (!this.isPhone(control.value)) {
        return { phone: true };
      }
      return {};
    };
}
