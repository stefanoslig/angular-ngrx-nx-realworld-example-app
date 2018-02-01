import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { map } from 'rxjs/operators/map';
import { LocalStorageJwtService } from './local-storage-jwt.service';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService, private localStorageJwtService: LocalStorageJwtService) {}

  authUser(type, credentials): Observable<any> {
    const route = type === 'LOGIN' ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials });
  }
}
