import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
	constructor(private apiService: ApiService, private localStorageJwtService: LocalStorageJwtService) { }

	authUser(type, credentials): Observable<any> {
		const route = type === 'LOGIN' ? '/login' : '';
		return this.apiService.post('/users' + route, { user: credentials });
	}
}
