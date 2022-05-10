import { ProfileService } from '../profile.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { profileActions } from './profile.actions';
import { ActionsService } from '@realworld/articles/data-access';

@Injectable()
export class ProfileEffects {
  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.loadProfile),
      groupBy((action) => action.id),
      mergeMap((group) =>
        group.pipe(
          map((action) => action.id),
          switchMap((username) =>
            this.profileService.getProfile(username).pipe(
              map((profile) => profileActions.loadProfileSuccess({ profile })),
              catchError((error) => of(profileActions.loadProfileFailure({ error }))),
            ),
          ),
        ),
      ),
    ),
  );

  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.follow),
      map((action) => action.id),
      concatMap((slug) =>
        this.actionsService.followUser(slug).pipe(
          map((response) => profileActions.followSuccess({ profile: response.profile })),
          catchError((error) => of(profileActions.followFailure({ error }))),
        ),
      ),
    ),
  );

  unFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.unfollow),
      map((action) => action.id),
      concatMap((slug) =>
        this.actionsService.unfollowUser(slug).pipe(
          map((response) => profileActions.unfollowSuccess({ profile: response.profile })),
          catchError((error) => of(profileActions.unfollowFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private actionsService: ActionsService,
    private profileService: ProfileService,
  ) {}
}
