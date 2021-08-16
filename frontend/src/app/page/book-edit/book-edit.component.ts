import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BookEdit, BookSave } from 'src/app/model/book';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  readonly book$ = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (typeof params.id === 'string') {
        return this.bookService.findById(params.id).pipe(
          map(bookEntity => {
            const book: BookEdit = {
              ...bookEntity,
              author: bookEntity.author._id,
              category: bookEntity.category?._id
            }
      
            return book;
          })
        );
      }

      const newEntity: BookSave = {
        title: '',
        price: 0,
        quantity: 1,
        author: ''
      };

      return of(newEntity);
    })
  );

  readonly authors$ = this.authorService.getAll();
  readonly categories$ = this.categoryService.getAll();

  private _error: string|null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  get error(): string|null {
    return this._error;
  }

  onSave(book: BookSave|BookEdit): void {
    if (this.isEdit(book)) {
      this.bookService.update(book).toPromise()
        .then(() => this.router.navigate(['/books']))
        .catch(() => 'Failed to update book');
    } else {
      this.bookService.save(book).toPromise()
        .then(() => this.router.navigate(['/books']))
        .catch(() => 'Failed to create book');
    }
  }

  // https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
  private isEdit(book: BookSave|BookEdit): book is BookEdit {
    return typeof (book as BookEdit)._id === 'string' && !!(book as BookEdit)._id;
  }
}
