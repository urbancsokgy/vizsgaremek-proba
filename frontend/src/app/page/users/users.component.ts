import { Component, OnInit } from '@angular/core';
import { IDataTableColumn } from 'src/app/common/data-table/data-table.component';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  readonly tableColumns: IDataTableColumn<User>[] = [
    { title: "First Name", value: user => user.firstName },
    { title: "Last Name", value: user => user.lastName },
    { title: "Email", value: user => user.email },
    { title: "Address", value: user => `${user.address.country}, ${user.address.city}` }
  ];

  readonly list$ = this.userService.getAll();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

}
