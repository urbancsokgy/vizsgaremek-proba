import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataTableColumn } from 'src/app/common/data-table/data-table.component';
import { Category } from 'src/app/model/category';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  readonly tableColumns: IDataTableColumn<Category>[] = [
    { title: "Name", value: category => category.name },
  ];

  list$ = this.categoryService.getAll();

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get isAdmin(): boolean {
    return this.authService.currentUser?.role === 'admin';
  }

  edit(category: Category): void {
    this.router.navigate(['/categories/edit/', category._id])
  }

  delete(category: Category): void {
    if (!window.confirm('Are you sure you wish to delete this category?')) {
      return;
    }

    this.categoryService.delete(category._id).toPromise()
      .then(() => this.list$ = this.categoryService.getAll())
      .catch(() => window.alert('Failed to delete category'));
  }
}
