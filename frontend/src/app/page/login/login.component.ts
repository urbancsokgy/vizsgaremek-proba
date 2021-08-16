import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly loginData: LoginData = {
    email: '',
    password: ''
  };

  private _error: string|null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  get error(): string|null {
    return this._error;
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this._error = null;

    this.authService.login(this.loginData).toPromise()
      .then(() => this.router.navigate(['/']))
      .catch((err: HttpErrorResponse) => {
        this._error = err.status === 401 ? 'Invalid credentials' : 'Failed to log in, try again later';
      });
  }
}
