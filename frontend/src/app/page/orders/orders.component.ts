import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataTableColumn } from 'src/app/common/data-table/data-table.component';
import { Book } from 'src/app/model/book';
import { AuthorNamePipe } from 'src/app/pipe/author-name.pipe';
import { UserNamePipe } from 'src/app/pipe/user-name.pipe';
import { Order } from 'src/app/model/order';
import { AuthService } from 'src/app/service/auth.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  readonly tableColumns: IDataTableColumn<Order>[] = [
    { title: "Customer name", value: order =>this.userNamePipe.transform (order.user) },
    { title: "Book title", value: order => order.book.title  },
    { title: "Book author", value: order => this.authorNamePipe.transform(order.book.author, true)  },
    { title: "Amount", value: order => order.amount.toString()  },
    { title: "Price", value: order => order.book.price.toString()  },
    { title: "Total price", value: order => (order.amount*order.book.price).toString()  },
  ];

  list$ = this.orderService.getAll();

  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private userNamePipe: UserNamePipe,
    private authorNamePipe : AuthorNamePipe,
    private router: Router,
    private authService: AuthService,
  ) { }

  get isAdmin(): boolean {
    return this.authService.currentUser?.role === 'admin';
  }
  delete(order: Order): void {
    if (!window.confirm('Are you sure you wish to delete this book?')) {
      return;
    }
    this.orderService.delete(order._id).toPromise()
      .then(() => this.list$ = this.orderService.getAll())
      .catch(() => window.alert('Failed to delete book'));
  }

  ngOnInit(): void {
  }

}
