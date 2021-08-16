import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../model/author';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private readonly baseUrl = `${this.config.apiUrl}/authors`;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) {}
  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }

  findById(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  update(author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.baseUrl}/${author._id}`, author);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
