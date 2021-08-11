import { ConfigService, ITableColumns } from './../../service/config.service';
import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() users: Observable<User[]> = this.userService.getAll();
  @Output() tableColumns : ITableColumns[]=this.config.userColumns;

  constructor(private userService: UserService,
    private config :ConfigService) { }

  ngOnInit(): void {

  }

}
