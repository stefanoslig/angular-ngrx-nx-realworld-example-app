import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../apps/conduit/src/environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get<R>(url: string, params: HttpParams = new HttpParams()): Observable<R> {
    return this.http.get<R>(`${environment.api_url}${url}`, { headers: this.headers, params });
  }

  post<R, D>(url: string, data?: D): Observable<R> {
    return this.http.post<R>(`${environment.api_url}${url}`, JSON.stringify(data), { headers: this.headers });
  }

  put<R, D>(url: string, data?: D): Observable<R> {
    return this.http.post<R>(`${environment.api_url}${url}`, JSON.stringify(data), { headers: this.headers });
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${url}`, { headers: this.headers });
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }
}
