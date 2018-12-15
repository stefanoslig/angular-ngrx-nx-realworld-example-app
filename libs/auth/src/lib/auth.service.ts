import { ApiService, User } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(private apiService: ApiService) { }

	user(): Observable<{ user: User }> {
		return this.apiService.get('/user');
	}

	login(credentials: { email: string, password: string }): Observable<User> {
		return this.apiService.post('/users/login', { user: credentials }).pipe(map(r => r.user));
	}

	register(credentials: { username: string, email: string, password: string }): Observable<User> {
		return this.apiService.post('/users', { user: credentials }).pipe(map(r => r.user));
	}
}
