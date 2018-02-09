import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { ProfileState } from './profile.interfaces';
import { ProfileService } from '@angular-ngrx-nx/profile/src/profile.service';
import { GetProfile } from '@angular-ngrx-nx/profile/src/+state/profile.actions';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ProfileEffects {
  @Effect()
  loadProfile = this.actions.ofType<GetProfile>('[profile] GET_PROFILE').pipe(
    map(action => action.payload),
    switchMap(username =>
      this.profileService.getProfile(username).pipe(
        map(results => ({
          type: '[profile] GET_PROFILE_SUCCESS',
          payload: results
        })),
        catchError(error =>
          of({
            type: '[profile] GET_PROFILE_FAIL',
            payload: error
          })
        )
      )
    )
  );

  constructor(private actions: Actions, private profileService: ProfileService) {}
}
