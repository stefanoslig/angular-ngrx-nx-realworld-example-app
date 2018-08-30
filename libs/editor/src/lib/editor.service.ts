import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';
import { map } from 'rxjs/operators';

@Injectable()
export class EditorService {
  constructor(private apiService: ApiService) {}

  publishArticle(article): Observable<ArticleData> {
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, { article: article }).pipe(map(data => data.article));
    }
    return this.apiService.post('/articles/', { article: article }).pipe(map(data => data.article));
  }

  get(slug: string): Observable<ArticleData> {
    return this.apiService.get('/articles/' + slug).pipe(map((data: any) => data.article));
  }
}
