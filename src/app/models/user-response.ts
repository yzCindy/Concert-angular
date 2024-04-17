
/**註冊登入response */
export interface LoginResponse {
  token: string;
  level: number;
  name: string;
  message:string;
}

/**查詢會員資料response */
export interface UserInfoResponse {
  email: string;
  name: string;
  phone: string;
  address:string
  message:string;
}



/**修改會員資料response */
export interface UpdateUserResponse {
  status: string;
  message: string;
  name:string;
}


