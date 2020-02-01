import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, SingleArticleResponse } from '@angular-ngrx-nx-realworld-example-app/api';
import { SingleCommentResponse, MultipleCommentsResponse } from './article.interfaces';

@Injectable()
export class ArticleService {
  constructor(private apiService: ApiService) {}

  getArticle(slug: string): Observable<SingleArticleResponse> {
    return this.apiService.get<SingleArticleResponse>('/articles/' + slug);
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

  addComment(slug: string, payload = ''): Observable<SingleCommentResponse> {
    return this.apiService.post<SingleCommentResponse, { comment: { body: string } }>(`/articles/${slug}/comments`, {
      comment: { body: payload },
    });
  }
}
