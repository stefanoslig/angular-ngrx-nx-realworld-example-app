import { ApiService, UserResponse } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, LoginUserRequest, NewUserRequest, NewUser } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  user(): Observable<UserResponse> {
    return this.apiService.get<UserResponse>('/user');
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>('/users/login', { user: credentials });
  }

  register(credentials: NewUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, NewUserRequest>('/users', { user: credentials });
  }
}
