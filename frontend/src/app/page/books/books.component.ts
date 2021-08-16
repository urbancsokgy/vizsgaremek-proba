import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataTableColumn } from 'src/app/common/data-table/data-table.component';
import { Book } from 'src/app/model/book';
import { AuthorNamePipe } from 'src/app/pipe/author-name.pipe';
import { AuthService } from 'src/app/service/auth.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  readonly tableColumns: IDataTableColumn<Book>[] = [
    { title: "Title", value: book => book.title },
    { title: "Author", value: book => this.authorNamePipe.transform(book.author, true) },
    { title: "Category", value: book => book.category?.name || '?' },
    { title: "Price (Ft)", value: book => `${book.price} Ft` },
    { title: 'Quantity', value: book => book.quantity > 0 ? book.quantity.toString() : 'out of stock' },
  ];

  list$ = this.bookService.getAll();

  constructor(
    private bookService: BookService,
    private authorNamePipe: AuthorNamePipe,
    private router: Router,
    private authService: AuthService,
  ) { }

  get isAdmin(): boolean {
    return this.authService.currentUser?.role === 'admin';
  }

  ngOnInit(): void {
  }

  edit(book: Book): void {
    this.router.navigate(['/books/edit/', book._id]);
  }

  delete(book: Book): void {
    if (!window.confirm('Are you sure you wish to delete this book?')) {
      return;
    }

    this.bookService.delete(book._id).toPromise()
      .then(() => this.list$ = this.bookService.getAll())
      .catch(() => window.alert('Failed to delete book'));
  }

  createNew(): void {
    this.router.navigate(['/books/create']);
  }
}
