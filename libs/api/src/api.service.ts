import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../apps/conduit/src/environments/environment';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ApiService {
	constructor(private http: Http) { }

	get<R>(url: string, params: URLSearchParams = new URLSearchParams()): Observable<R> {
		return this.http
			.get(`${environment.api_url}${url}`, { headers: this.headers, search: params })
			.pipe(map((res: Response) => res.json()));
	}

	post<D>(url: string, data?: D): Observable<Response> {
		return this.http
			.post(`${environment.api_url}${url}`, JSON.stringify(data), { headers: this.headers })
			.pipe(map((res: Response) => res.json()));
	}

	put<D>(url: string, data?: D): Observable<Response> {
		return this.http
			.post(`${environment.api_url}${url}`, JSON.stringify(data), { headers: this.headers })
			.pipe(map((res: Response) => res.json()));
	}

	delete(url: string): Observable<Response> {
		return this.http
			.delete(`${environment.api_url}${url}`, { headers: this.headers })
			.pipe(map((res: Response) => res.json()));
	}

	get headers(): Headers {
		const headersConfig = {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};

		return new Headers(headersConfig);
	}
}
