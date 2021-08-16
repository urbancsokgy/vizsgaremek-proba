import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly baseUrl = `${this.config.apiUrl}/orders`;

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) {}
  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  findById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  // update(order: OrderEdit): Observable<Order> {
  //   return this.http.put<Order>(`${this.baseUrl}/${order._id}`, order);
  // }

  // save(order: OrderSave): Observable<Order> {
  //   return this.http.post<Order>(`${this.baseUrl}`, order);
  // }

   delete(id: string): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
