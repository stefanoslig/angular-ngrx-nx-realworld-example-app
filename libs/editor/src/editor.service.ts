import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Article } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { map } from 'rxjs/operators/map';

@Injectable()
export class EditorService {
  constructor(private apiService: ApiService) {}

  publishArticle(article): Observable<Article> {
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, { article: article }).pipe(map(data => data.article));
    }
    return this.apiService.post('/articles/', { article: article }).pipe(map(data => data.article));
  }
}
