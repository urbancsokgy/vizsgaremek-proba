import { Observable } from 'rxjs';
import { User } from './../../model/user';
import { Component, Input, OnInit } from '@angular/core';
import { ITableColumns, ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent  <T extends {[propname: string]: any}> implements OnInit {

  @Input() tableColumns : ITableColumns[]=[]
  @Input() data :Observable<T[]> | null=null

  constructor(private userService: UserService,
    private config :ConfigService) { }

  ngOnInit(): void {
  }

}
