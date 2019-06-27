import { ApiService, Profile } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
  constructor(private apiService: ApiService) {}

  getProfile(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username).pipe(map((data: { profile: Profile }) => data.profile));
  }
}
