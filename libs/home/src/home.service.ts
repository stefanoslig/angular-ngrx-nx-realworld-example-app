import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { ArticleListConfig } from '@angular-ngrx-nx/home/src/+state/home.interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpParams } from '@angular/common/http';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

//TODO: Should be removed to shared folder as articles.service.ts because I need some of these functions for the article lib

@Injectable()
export class HomeService {
  constructor(private apiService: ApiService) {}

  query(config: ArticleListConfig): Observable<any> {
    return this.apiService.get(
      '/articles' + (config.type === 'FEED' ? '/feed' : ''),
      this.toHttpParams(config.filters)
    );
  }

  getTags(): Observable<any> {
    return this.apiService.get('/tags');
  }

  favorite(slug): Observable<ArticleData> {
    return this.apiService.post('/articles/' + slug + '/favorite').pipe(map(data => data.article));
  }

  unfavorite(slug): Observable<ArticleData> {
    return this.apiService.delete('/articles/' + slug + '/favorite').pipe(map(data => data.article));
  }

  private toHttpParams(params) {
    return Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}
