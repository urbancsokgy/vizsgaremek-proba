import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataTableColumn } from 'src/app/common/data-table/data-table.component';
import { Author } from 'src/app/model/author';
import { AuthorNamePipe } from 'src/app/pipe/author-name.pipe';
import { AuthService } from 'src/app/service/auth.service';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  readonly tableColumns: IDataTableColumn<Author>[] = [
    { title: "Name", value: author => this.authorNamePipe.transform(author) },
    { title: "Born at", value: author => author.born?.toString() || 'unknown' },
  ];

  list$ = this.authorService.getAll();

  constructor(
    private authorService: AuthorService,
    private authorNamePipe: AuthorNamePipe,
    private router: Router,
    private authService: AuthService,
  ) { }

  get isAdmin(): boolean {
    return this.authService.currentUser?.role === 'admin';
  }

  ngOnInit(): void {
  }

  edit(author: Author): void {
    this.router.navigate(['/authors/edit/', author._id]);
  }

  delete(author: Author): void {
    if (!window.confirm('Are you sure you wish to delete this author?')) {
      return;
    }

    this.authorService.delete(author._id).toPromise()
      .then(() => this.list$ = this.authorService.getAll())
      .catch(() => window.alert('Failed to delete author'));
  }
}
