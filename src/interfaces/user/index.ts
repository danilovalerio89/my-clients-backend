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
  clients: {
    id: string;
    name: string;
    email: string;
    phone: string;
  }[];
}

export interface IUserList {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
