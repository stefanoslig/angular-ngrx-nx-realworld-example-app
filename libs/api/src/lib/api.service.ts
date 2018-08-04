import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${url}`, { headers: this.headers, params });
  }

  post(url: string, data: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${url}`, JSON.stringify(data), { headers: this.headers });
  }

  put(url: string, data: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${url}`, JSON.stringify(data), { headers: this.headers });
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
