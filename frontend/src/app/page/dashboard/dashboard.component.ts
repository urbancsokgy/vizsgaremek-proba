import { UserService } from 'src/app/service/user.service';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly categoryCount$ = this.categoryService.count();
  readonly bookCount$ = this.bookService.count();
  readonly authorCount$ = this.authorService.count();
  readonly userCount$ = this.userService.count();



  constructor(
    private categoryService: CategoryService,
    private bookService : BookService,
    private authorService : AuthorService,
    private userService : UserService,
  ) { }

  ngOnInit(): void {
  }

}
