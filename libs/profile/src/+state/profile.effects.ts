import 'rxjs/add/operator/switchMap';

import { ActionsService } from '@angular-ngrx-nx/core/src/actions.service';
import { GetProfile } from '@angular-ngrx-nx/profile/src/+state/profile.actions';
import { ProfileService } from '@angular-ngrx-nx/profile/src/profile.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { concatMap } from 'rxjs/operators/concatMap';
import { groupBy } from 'rxjs/operators/groupBy';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { switchMap } from 'rxjs/operators/switchMap';
import { delay } from 'rxjs/operators/delay';

import { Follow, UnFollow } from './profile.actions';

@Injectable()
export class ProfileEffects {
  @Effect()
  getProfile = this.actions.ofType<GetProfile>('[profile] GET_PROFILE').pipe(
    groupBy(action => action.payload),
    mergeMap(group =>
      group.pipe(
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
      )
    )
  );

  @Effect()
  follow = this.actions.ofType<Follow>('[profile] FOLLOW').pipe(
    map(action => action.payload),
    concatMap(slug =>
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
    concatMap(slug =>
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
