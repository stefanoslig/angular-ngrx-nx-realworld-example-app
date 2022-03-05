import { Article } from '@realworld/core/api-types';
import { ApiService } from '@realworld/core/http-client';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleListConfig } from './+state/article-list.reducer';

@Injectable({ providedIn: 'root' })
export class ArticleListService {
  constructor(private apiService: ApiService) {}

  query(config: ArticleListConfig): Observable<{ articles: Article[]; articlesCount: number }> {
    return this.apiService.get(
      '/articles' + (config.type === 'FEED' ? '/feed' : ''),
      this.toHttpParams(config.filters),
    );
  }

  // TODO: remove any
  private toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}
