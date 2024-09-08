import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@realworld/core/http-client';
import {
  Article,
  ArticleResponse,
  MultipleCommentsResponse,
  NewArticle,
  SingleCommentResponse,
} from '@realworld/core/api-types';
import { HttpParams } from '@angular/common/http';
import { ArticlesListConfig } from '../models/articles-list.model';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private readonly apiService = inject(ApiService);

  getArticle(slug: string): Observable<ArticleResponse> {
    return this.apiService.get<ArticleResponse>('/articles/' + slug);
  }

  getComments(slug: string): Observable<MultipleCommentsResponse> {
    return this.apiService.get<MultipleCommentsResponse>(`/articles/${slug}/comments`);
  }

  deleteArticle(slug: string): Observable<void> {
    return this.apiService.delete<void>('/articles/' + slug);
  }

  deleteComment(commentId: number, slug: string): Observable<void> {
    return this.apiService.delete<void>(`/articles/${slug}/comments/${commentId}`);
  }

  addComment(slug: string, comment: string): Observable<SingleCommentResponse> {
    return this.apiService.post<SingleCommentResponse, { comment: { body: string } }>(`/articles/${slug}/comments`, {
      comment: { body: comment },
    });
  }

  query(config: ArticlesListConfig): Observable<{ articles: Article[]; articlesCount: number }> {
    return this.apiService.get(
      '/articles' + (config.type === 'FEED' ? '/feed' : ''),
      this.toHttpParams(config.filters),
    );
  }

  publishArticle(article: NewArticle): Observable<ArticleResponse> {
    return this.apiService.post<ArticleResponse, NewArticle>('/articles/', article);
  }

  editArticle(article: Article): Observable<ArticleResponse> {
    return this.apiService.put<ArticleResponse, ArticleResponse>('/articles/' + article.slug, {
      article: article,
    });
  }

  // TODO: remove any
  private toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}
