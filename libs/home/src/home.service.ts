import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { ArticleListConfig } from '@angular-ngrx-nx/home/src/+state/home.interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class HomeService {
  constructor(private apiService: ApiService) {}

  query(config: ArticleListConfig): Observable<any> {
    const params = {};

    Object.keys(config.filters).forEach(key => {
      params[key] = config.filters[key];
    });

    return this.apiService.get('/articles' + (config.type === 'FEED' ? '/feed' : ''), new HttpParams(params));
  }

  getTags(): Observable<any> {
    return this.apiService.get('/tags');
  }
}
