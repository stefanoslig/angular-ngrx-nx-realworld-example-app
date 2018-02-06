import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService) {}

  update(user): Observable<User> {
    return this.apiService.put('/user', { user });
  }
}
