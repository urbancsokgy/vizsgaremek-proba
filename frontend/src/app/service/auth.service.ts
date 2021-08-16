import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginData, User } from '../model/user';
import { ConfigService } from './config.service';

const localStorageKey = 'currentUser';

interface UserWithToken {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginUrl: string = `${this.config.backendUrl}/login`;
  private readonly currentUserSubject$ = new BehaviorSubject<UserWithToken | null>(null);

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
  ) {
    const userInStorage = localStorage.getItem(localStorageKey);

    if (userInStorage) {
      const user: UserWithToken = JSON.parse(userInStorage);
      this.currentUserSubject$.next(user);
    }
  }

  get currentUser$(): Observable<User|null> {
    return this.currentUserSubject$.pipe(map(data => data?.user || null));
  }

  get currentToken(): string|null {
    return this.currentUserSubject$.value?.token || null;
  }

  get currentUser(): User|null {
    return this.currentUserSubject$.value?.user || null;
  }

  login(loginData: LoginData): Observable<void> {
    return this.http.post<{user: User, accessToken: string}>(
      this.loginUrl,
      loginData
    ).pipe(
      map(response => {
        const userWithToken: UserWithToken = {
          user: response.user,
          token: response.accessToken
        };

        this.currentUserSubject$.next(userWithToken);
        localStorage.setItem(localStorageKey, JSON.stringify(userWithToken));
      })
    );
  }

  logout(): void {
    this.currentUserSubject$.next(null);
    localStorage.removeItem(localStorageKey);
    this.router.navigate(['/', 'login']);
  }
}
