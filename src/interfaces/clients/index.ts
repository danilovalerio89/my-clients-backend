export interface IContactCreate {
  name: string;
  email: string;
  phone: string;
}

export interface IContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IContactUpdate {
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
