import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  readonly category$ = this.activatedRoute.params.pipe(
    map(params => params.id as string),
    switchMap(id => this.categoryService.findById(id))
  );

  private _error: string|null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  get error(): string|null {
    return this._error;
  }

  ngOnInit(): void {
  }

  onSave(category: Category): void {
    this._error = null;

    this.categoryService.update(category).toPromise()
      .then(() => this.router.navigate(['/categories']))
      .catch((err: HttpErrorResponse) => this._error = err.error?.message || 'Failed to update category');
  }
}
