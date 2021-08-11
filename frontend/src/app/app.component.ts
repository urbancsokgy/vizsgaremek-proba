import { Order } from './model/order';
import { OrderService } from './service/order.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  users: Observable<User[]> = this.userService.getAll();
  orders: Observable<Order[]> = this.orderService.getAll();
  oneUser: Observable<User> = this.userService.get('fasfdasfasdffff541515');

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {
  }
}
