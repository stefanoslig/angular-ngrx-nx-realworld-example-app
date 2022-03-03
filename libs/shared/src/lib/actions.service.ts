import { ProfileResponse, ArticleResponse } from '@realworld/core/api-types';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@realworld/core/http-client';

@Injectable({ providedIn: 'root' })
export class ActionsService {
  constructor(private apiService: ApiService) {}

  followUser(username: string): Observable<ProfileResponse> {
    return this.apiService.post<ProfileResponse, void>('/profiles/' + username + '/follow');
  }

  unfollowUser(username: string): Observable<ProfileResponse> {
    return this.apiService.delete<ProfileResponse>('/profiles/' + username + '/follow');
  }

  favorite(slug: string): Observable<ArticleResponse> {
    return this.apiService.post<ArticleResponse, void>('/articles/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<ArticleResponse> {
    return this.apiService.delete<ArticleResponse>('/articles/' + slug + '/favorite');
  }
}
