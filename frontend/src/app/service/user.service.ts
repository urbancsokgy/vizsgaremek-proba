import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpData, User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `${this.config.apiUrl}/users`;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) {}
  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  signUp(data: SignUpData): Observable<void> {
    return this.http.post<void>(this.baseUrl, data);
  }
}
