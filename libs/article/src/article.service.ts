import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { Article, ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ArticleService {
  constructor(private apiService: ApiService) {}

  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug).pipe(map((data: any) => data.article));
  }

  getComments(slug): Observable<ArticleComment[]> {
    return this.apiService.get(`/articles/${slug}/comments`).pipe(map((data: any) => data.comments));
  }
}
