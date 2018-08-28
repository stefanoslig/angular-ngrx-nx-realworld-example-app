import { ApiService, Profile, ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ActionsService {
  constructor(private apiService: ApiService) {}

  followUser(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow').pipe(map(data => data.profile));
  }

  unfollowUser(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow').pipe(map(data => data.profile));
  }

  favorite(slug): Observable<ArticleData> {
    return this.apiService.post('/articles/' + slug + '/favorite').pipe(map(data => data.article));
  }

  unfavorite(slug): Observable<ArticleData> {
    return this.apiService.delete('/articles/' + slug + '/favorite').pipe(map(data => data.article));
  }
}
