import { OrderService } from './../../service/order.service';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Observable<Order[]> = this.orderService.getAll();
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

}
