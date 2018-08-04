import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '@angular-ngrx-nx-realworld-example-app/auth';
import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService) {}

  update(user): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(map(result => result.user));
  }
}
