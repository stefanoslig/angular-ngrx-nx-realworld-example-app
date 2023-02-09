import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionsService } from '@realworld/articles/data-access';
import { catchError, concatMap, groupBy, map, mergeMap, of, switchMap } from 'rxjs';
import { ProfileService } from '../profile.service';
import { profileActions } from './profile.actions';

export const unFollow$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(profileActions.unfollow),
      map((action) => action.id),
      concatMap((slug) =>
        actionsService.unfollowUser(slug).pipe(
          map((response) => profileActions.unfollowSuccess({ profile: response.profile })),
          catchError((error) => of(profileActions.unfollowFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const follow$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(profileActions.follow),
      map((action) => action.id),
      concatMap((slug) =>
        actionsService.followUser(slug).pipe(
          map((response) => profileActions.followSuccess({ profile: response.profile })),
          catchError((error) => of(profileActions.followFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getProfile$ = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.loadProfile),
      groupBy((action) => action.id),
      mergeMap((group) =>
        group.pipe(
          map((action) => action.id),
          switchMap((username) =>
            profileService.getProfile(username).pipe(
              map((profile) => profileActions.loadProfileSuccess({ profile })),
              catchError((error) => of(profileActions.loadProfileFailure({ error }))),
            ),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
