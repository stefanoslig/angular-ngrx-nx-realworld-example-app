import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageJwtService } from './local-storage-jwt.service';

@Injectable()
export class AuthService {
	constructor(private apiService: ApiService, private localStorageJwtService: LocalStorageJwtService) { }

	authUser(type, credentials): Observable<any> {
		const route = type === 'LOGIN' ? '/login' : '';
		return this.apiService.post('/users' + route, { user: credentials });
	}
}
