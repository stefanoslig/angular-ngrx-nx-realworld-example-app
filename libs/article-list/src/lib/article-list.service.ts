import {
  ApiService,
  ArticleData
} from '@angular-ngrx-nx-realworld-example-app/api';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleListConfig, Articles } from './+state/article-list.reducer';

@Injectable()
export class ArticleListService {
  constructor(private apiService: ApiService) {}

  query(
    config: ArticleListConfig
  ): Observable<{ articles: ArticleData[]; articlesCount: number }> {
    return this.apiService.get(
      '/articles' + (config.type === 'FEED' ? '/feed' : ''),
      this.toHttpParams(config.filters)
    );
  }

  private toHttpParams(params) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams()
    );
  }
}
