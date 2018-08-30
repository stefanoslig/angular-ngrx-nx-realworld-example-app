import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ArticleData, ArticleComment } from '@angular-ngrx-nx-realworld-example-app/api';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {
  constructor(private apiService: ApiService) {}

  get(slug: string): Observable<ArticleData> {
    return this.apiService.get('/articles/' + slug).pipe(map((data: any) => data.article));
  }

  getComments(slug: string): Observable<ArticleComment[]> {
    return this.apiService.get(`/articles/${slug}/comments`).pipe(map((data: any) => data.comments));
  }

  deleteArticle(slug: string) {
    return this.apiService.delete('/articles/' + slug);
  }

  deleteComment(commentId: number, slug: string) {
    return this.apiService.delete(`/articles/${slug}/comments/${commentId}`);
  }

  addComment(slug, payload = ''): Observable<ArticleComment> {
    return this.apiService
      .post(`/articles/${slug}/comments`, { comment: { body: payload } })
      .pipe(map(data => data.comment));
  }
}
