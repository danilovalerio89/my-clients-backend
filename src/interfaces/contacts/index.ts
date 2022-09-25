export interface IContactCreate {
  firstName: string;
  lastName: string;
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
  clientId: string;
}

export interface IContactUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
