/**註冊request */
export interface RegisterRequest {
  email: string;
  password: string;
  level: number;
  name: string;
  phone: string;
  address: string;
}

/**登入request */
export interface LoginRequest {
  email: string;
  password: string;
}

/**修改會員資訊request */
export interface UpdateUserRequest {
  name: string;
  phone: string;
  address: string;
}
