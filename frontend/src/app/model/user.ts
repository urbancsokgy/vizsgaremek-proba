export interface Address {
  country: string;
  city: string;
  zip: number;
  street: string;
  building: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData extends LoginData {
  firstName: string;
  lastName: string;
  address: Address;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  role: string;
}
