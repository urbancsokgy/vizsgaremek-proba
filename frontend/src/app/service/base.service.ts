import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  // private readonly apiUrl: string = 'http://localhost:3000/';
  entity: string = '';

  constructor(
    public config : ConfigService,
    public http: HttpClient
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.apiUrl}${this.entity}`);
  }
  get(_id : string): Observable<T>{
    return this.http.get<T>(`${this.config.apiUrl}${this.entity}/${_id}`);
  }

}
