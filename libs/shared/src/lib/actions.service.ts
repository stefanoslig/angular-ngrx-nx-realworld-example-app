import { ApiService, ProfileResponse, SingleArticleResponse } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ActionsService {
  constructor(private apiService: ApiService) {}

  followUser(username: string): Observable<ProfileResponse> {
    return this.apiService.post<ProfileResponse, void>('/profiles/' + username + '/follow', null);
  }

  unfollowUser(username: string): Observable<ProfileResponse> {
    return this.apiService.delete<ProfileResponse>('/profiles/' + username + '/follow');
  }

  favorite(slug: string): Observable<SingleArticleResponse> {
    return this.apiService.post<SingleArticleResponse, void>('/articles/' + slug + '/favorite', null);
  }

  unfavorite(slug: string): Observable<SingleArticleResponse> {
    return this.apiService.delete<SingleArticleResponse>('/articles/' + slug + '/favorite');
  }
}
