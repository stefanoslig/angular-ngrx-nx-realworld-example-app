import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, User, UserResponse } from '@angular-ngrx-nx-realworld-example-app/api';
import { UpdateUserRequest } from '@angular-ngrx-nx-realworld-example-app/settings/settings.interfaces';

@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService) {}

  update(user: User): Observable<UserResponse> {
    return this.apiService.put<UserResponse, UpdateUserRequest>('/user', { user });
  }
}
