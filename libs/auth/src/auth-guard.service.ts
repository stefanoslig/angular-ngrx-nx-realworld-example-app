import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take } from 'rxjs/operators/take';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private storage: LocalStorageJwtService, private router: Router) { }

	canActivate(): boolean {
		let token: string;
		this.storage.getItem().pipe(take(1)).subscribe(t => (token = t));
		if (!token) {
			this.router.navigate(['/login']);
			return false;
		}
		return true;
	}
}


