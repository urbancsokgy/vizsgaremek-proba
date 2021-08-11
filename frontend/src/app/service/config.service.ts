import { Injectable } from '@angular/core';

export interface ITableColumns{
  title: string;
  key: string;
  hidden? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public readonly apiUrl: string = 'http://localhost:3000/';
  userColumns:ITableColumns[]=[
    { key: "_id", title:  '#', hidden: false},
    { key: "firstName", title:  'First name', hidden: false},
    { key: "lastName", title:  'Last name', hidden: false},
    { key: "email", title:  'Email', hidden: false},
    { key: "address", title:  'Adress', hidden: false},
    { key: "active", title:  'Active', hidden: false}

  ]
  productColumns:ITableColumns[]=[
    { key: "_id", title:  '#', hidden: false},
    { key: "name", title:  'Name', hidden: false},
    { key: "description", title:  'description', hidden: false},
    { key: "price", title:  'price', hidden: false},
    { key: "active", title:  'Active', hidden: false}

  ]


  constructor() { }

}
