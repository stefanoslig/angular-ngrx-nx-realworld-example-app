import { Injectable } from '@angular/core';
import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { Observable } from 'rxjs/Observable';
import { Profile } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ProfileService {
  constructor(private apiService: ApiService) {}

  getProfile(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username).pipe(map((data: { profile: Profile }) => data.profile));
  }
}
