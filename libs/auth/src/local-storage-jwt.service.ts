import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LocalStorageJwtService {
	getItem(): Observable<string> {
		let data: any = localStorage.getItem('jwtToken');
		if (data) return of(JSON.parse(data));
		return of(data);
	}

	setItem(data: string) {
		localStorage.setItem('jwtToken', JSON.stringify(data));
	}

	removeItem(): Observable<boolean> {
		localStorage.removeItem('jwtToken');
		return of(true);
	}
}
