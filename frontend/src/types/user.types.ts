export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ISignupCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IAuthResponse {
  success: boolean;
  data: {
    user: IUser;
    token: string;
  };
  message?: string;
}
