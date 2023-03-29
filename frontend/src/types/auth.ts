export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  avatar: FileList | string;
}

export interface AuthCreds {
  email: string;
  password: string;
}

export interface ReturnedAuthCreds {
  access_token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface UserState {
  userList: [];
  currentUser?: User;
  success: boolean;
}

export interface IAuthState {
  loggedIn: boolean;
  userInfo: User | null;
  error: boolean;
  errorMsg: string;
}
