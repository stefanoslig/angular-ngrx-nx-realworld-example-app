import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@realworld/core/http-client';
import { ArticleResponse, Article } from '@realworld/core/api-types';

import { NewArticleRequest } from './editor.interfaces';

@Injectable({ providedIn: 'root' })
export class EditorService {
  constructor(private apiService: ApiService) {}

  publishArticle(article: Article): Observable<ArticleResponse> {
    if (article.slug) {
      return this.apiService.put<ArticleResponse, NewArticleRequest>('/articles/' + article.slug, {
        article: article,
      });
    }
    return this.apiService.post<ArticleResponse, NewArticleRequest>('/articles/', { article: article });
  }

  get(slug: string): Observable<ArticleResponse> {
    return this.apiService.get<ArticleResponse>('/articles/' + slug);
  }
}
