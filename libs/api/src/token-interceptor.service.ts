import { Injectable } from '@angular/core';
import { LocalStorageJwtService } from '@angular-ngrx-nx/auth/src/local-storage-jwt.service';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Observable } from 'rxjs/Observable';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
	constructor(private localStorage: LocalStorageJwtService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token: string;
		this.localStorage.getItem().subscribe(t => token = t);
		if (token) request = request.clone({
			setHeaders: {
				Authorization: `Token ${token}`
			}
		});
		return next.handle(request);
	}


}
