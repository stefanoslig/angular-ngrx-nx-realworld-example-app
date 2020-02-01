import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, Article, SingleArticleResponse } from '@angular-ngrx-nx-realworld-example-app/api';
import { NewArticleRequest } from './editor.interfaces';

@Injectable()
export class EditorService {
  constructor(private apiService: ApiService) {}

  publishArticle(article: Article): Observable<SingleArticleResponse> {
    if (article.slug) {
      return this.apiService.put<SingleArticleResponse, NewArticleRequest>('/articles/' + article.slug, {
        article: article,
      });
    }
    return this.apiService.post<SingleArticleResponse, NewArticleRequest>('/articles/', { article: article });
  }

  get(slug: string): Observable<SingleArticleResponse> {
    return this.apiService.get<SingleArticleResponse>('/articles/' + slug);
  }
}
