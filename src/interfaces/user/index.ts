export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserList {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserData {
  id?: string;
  email?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}
