import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataTableColumn } from 'src/app/common/data-table/data-table.component';
import { Book } from 'src/app/model/book';
import { Order } from 'src/app/model/order';
import { AuthService } from 'src/app/service/auth.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  list$ = this.orderService.getAll();

  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
