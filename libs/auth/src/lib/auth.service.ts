import { ApiService, User, LoginCredentials, RegisterCredentials } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  user(): Observable<{ user: User }> {
    return this.apiService.get('/user');
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.apiService
      .post<{ user: User }, { user: LoginCredentials }>('/users/login', { user: credentials })
      .pipe(map(r => r.user));
  }

  register(credentials: RegisterCredentials): Observable<User> {
    return this.apiService
      .post<{ user: User }, { user: LoginCredentials }>('/users', { user: credentials })
      .pipe(map(r => r.user));
  }
}
