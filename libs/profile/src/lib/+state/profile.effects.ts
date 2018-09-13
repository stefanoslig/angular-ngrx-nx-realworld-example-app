import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { GetProfile, ProfileActionTypes } from '../+state/profile.actions';
import { ProfileService } from '../profile.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';

import { Follow, UnFollow } from './profile.actions';

@Injectable()
export class ProfileEffects {
  @Effect()
  getProfile = this.actions.ofType<GetProfile>(ProfileActionTypes.GET_PROFILE).pipe(
    groupBy(action => action.payload),
    mergeMap(group =>
      group.pipe(
        map(action => action.payload),
        switchMap(username =>
          this.profileService.getProfile(username).pipe(
            map(results => ({
              type: ProfileActionTypes.GET_PROFILE_SUCCESS,
              payload: results
            })),
            catchError(error =>
              of({
                type: ProfileActionTypes.GET_PROFILE_FAIL,
                payload: error
              })
            )
          )
        )
      )
    )
  );

  @Effect()
  follow = this.actions.ofType<Follow>(ProfileActionTypes.FOLLOW).pipe(
    map(action => action.payload),
    concatMap(slug =>
      this.actionsService.followUser(slug).pipe(
        map(results => ({
          type: ProfileActionTypes.FOLLOW_SUCCESS,
          payload: results
        })),
        catchError(error =>
          of({
            type: ProfileActionTypes.FOLLOW_FAIL,
            payload: error
          })
        )
      )
    )
  );

  @Effect()
  unFollow = this.actions.ofType<UnFollow>(ProfileActionTypes.UNFOLLOW).pipe(
    map(action => action.payload),
    concatMap(slug =>
      this.actionsService.unfollowUser(slug).pipe(
        map(results => ({
          type: ProfileActionTypes.UNFOLLOW_SUCCESS,
          payload: results
        })),
        catchError(error =>
          of({
            type: ProfileActionTypes.UNFOLLOW_FAIL,
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
