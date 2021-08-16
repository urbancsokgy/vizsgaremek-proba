import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl = `${this.config.apiUrl}/categories`;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${category._id}`, category);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
