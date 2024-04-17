import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject,tap } from 'rxjs';
import { Router } from '@angular/router';

//environment
import { environment, levelName } from './../../environments/environment';

//interface
import { LoginResponse, UpdateUserResponse, UserInfoResponse } from '../models/user-response';
import { LoginRequest, UpdateUserRequest,RegisterRequest } from '../models/user-request';

@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(
    private http: HttpClient, private router: Router) { }

  private Register_API_URL = `${environment.API_URL}/user/register`;
  private Login_API_URL = `${environment.API_URL}/user/login`;
  private Validate_API_URL = `${environment.API_URL}/user/validate`;
  private UserInfo_API_URL = `${environment.API_URL}/user/info`;
  private UpdateUserInfo_API_URL = `${environment.API_URL}/user/modify`;

  //建立可監聽是否有登入活動
  private loginUserSource = new Subject<LoginResponse>();
  loginUser$ = this.loginUserSource.asObservable();
  loginUser(loginUser: LoginResponse) {
    this.loginUserSource.next(loginUser);
  }

  //建立可監聽是否修改會員資料
  private userDataChangeSource = new Subject<UpdateUserResponse>();
  userUpdate$ = this.userDataChangeSource.asObservable();
  updateUser(userData: UpdateUserResponse) {
    this.userDataChangeSource.next(userData);
  }

  // 初始值
  level = levelName.none;

  /** POST:  自動登入，傳token給後端自行驗證 */
  autoLogin(token: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    return this.http.post<LoginResponse>(this.Validate_API_URL, null, { headers }).pipe(
      //處理回應資訊
      tap(response => {
        if (response.level == levelName.user) {
          this.level = levelName.user;
        } else if (response.level == levelName.manager) {
          this.level = levelName.manager;
        } else {
          this.level = levelName.none;
        }
        //傳送登入資訊給予監聽者
        this.loginUser(response);
      })
    );
  }


  /** POST: 註冊會員*/
  registerFn(registerData: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.Register_API_URL, registerData)
  }

  /**POST: 登入會員 */
  loginFn(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.Login_API_URL, loginRequest)
  }

  /**GET: 查詢會員資料 */
  userData(): Observable<UserInfoResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });

    return this.http.get<UserInfoResponse>(this.UserInfo_API_URL, { headers })
  }

  /**PUT: 修改會員資料 */
  updateData(updateData: UpdateUserRequest): Observable<UpdateUserResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    return this.http.put<UpdateUserResponse>(this.UpdateUserInfo_API_URL, updateData, { headers })
  }


}






