import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorEditComponent } from './page/author-edit/author-edit.component';
import { AuthorsComponent } from './page/authors/authors.component';
import { BookEditComponent } from './page/book-edit/book-edit.component';
import { BooksComponent } from './page/books/books.component';
import { CategoriesComponent } from './page/categories/categories.component';
import { CategoryEditComponent } from './page/category-edit/category-edit.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { SignupComponent } from './page/signup/signup.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoriesComponent,
      },
      {
        path: 'edit/:id',
        component: CategoryEditComponent
      }
    ]
  },
  {
    path: 'authors',
    children: [
      {
        path: '',
        component: AuthorsComponent,
      },
      {
        path: 'edit/:id',
        component: AuthorEditComponent
      }
    ]
  },
  {
    path: 'books',
    children: [
      {
        path: '',
        component: BooksComponent,
      },
      {
        path: 'create',
        component: BookEditComponent,
      },
      {
        path: 'edit/:id',
        component: BookEditComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
