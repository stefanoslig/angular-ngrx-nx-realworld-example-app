import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResponse } from '@realworld/core/api-types';
import { ApiService } from '@realworld/core/http-client';
import { UpdateUserRequest } from '@angular-ngrx-nx-realworld-example-app/settings/settings.interfaces';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private apiService: ApiService) {}

  update(user: User): Observable<UserResponse> {
    return this.apiService.put<UserResponse, UpdateUserRequest>('/user', { user });
  }
}
