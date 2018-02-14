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
import { ActionsService } from '@angular-ngrx-nx/core/src/actions.service';
import { Follow, UnFollow } from './profile.actions';

@Injectable()
export class ProfileEffects {
  @Effect()
  getProfile = this.actions.ofType<GetProfile>('[profile] GET_PROFILE').pipe(
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

  @Effect()
  follow = this.actions.ofType<Follow>('[profile] FOLLOW').pipe(
    map(action => action.payload),
    switchMap(slug =>
      this.actionsService.followUser(slug).pipe(
        map(results => ({
          type: '[profile] FOLLOW_SUCCESS',
          payload: results
        })),
        catchError(error =>
          of({
            type: '[profile] FOLLOW_FAIL',
            payload: error
          })
        )
      )
    )
  );

  @Effect()
  unFollow = this.actions.ofType<UnFollow>('[profile] UNFOLLOW').pipe(
    map(action => action.payload),
    switchMap(slug =>
      this.actionsService.unfollowUser(slug).pipe(
        map(results => ({
          type: '[profile] UNFOLLOW_SUCCESS',
          payload: results
        })),
        catchError(error =>
          of({
            type: '[profile] UNFOLLOW_FAIL',
            payload: error
          })
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private actionsService: ActionsService,
    private profileService: ProfileService
  ) {}
}
