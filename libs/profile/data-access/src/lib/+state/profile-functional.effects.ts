import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionsService } from '@realworld/articles/data-access';
import { catchError, concatMap, map, of } from 'rxjs';
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
