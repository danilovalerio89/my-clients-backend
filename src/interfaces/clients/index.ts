import { IContactResponse } from "../contacts";

export interface IClientCreate {
  name: string;
  email: string;
  phone: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IClientUpdate {
  name?: string;
  email?: string;
  phone?: string;
}

export interface IClientContactsResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  contacts: IContactResponse[];
}
