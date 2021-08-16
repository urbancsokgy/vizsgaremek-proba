import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Author } from 'src/app/model/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {

  readonly author$ = this.activatedRoute.params.pipe(
    map(params => params.id as string),
    switchMap(id => this.authorService.findById(id))
  );

  private _error: string|null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService
  ) { }

  get error(): string|null {
    return this._error;
  }

  ngOnInit(): void {
  }

  onSave(author: Author): void {
    this._error = null;

    this.authorService.update(author).toPromise()
      .then(() => this.router.navigate(['/authors']))
      .catch((err: HttpErrorResponse) => this._error = err.error?.message || 'Failed to save author');
  }
}
