import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { articlesActions } from '../articles.actions';
import { ActionsService } from '../../services/actions.service';
import { articleActions } from './article.actions';

export const favorite$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articlesActions.favorite),
      concatMap(({ slug }) =>
        actionsService.favorite(slug).pipe(
          map((response) => articlesActions.favoriteSuccess({ article: response.article })),
          catchError((error) => of(articlesActions.favoriteFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const unFavorite$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articlesActions.unfavorite),
      concatMap(({ slug }) =>
        actionsService.unfavorite(slug).pipe(
          map((response) => articlesActions.unfavoriteSuccess({ article: response.article })),
          catchError((error) => of(articlesActions.unfavoriteFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const unFollow$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articleActions.unfollow),
      concatMap(({ username }) =>
        actionsService.unfollowUser(username).pipe(
          map((response) => articleActions.unfollowSuccess({ profile: response.profile })),
          catchError((error) => of(articleActions.unfollowFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const follow$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articleActions.follow),
      concatMap(({ username }) =>
        actionsService.followUser(username).pipe(
          map((response) => articleActions.followSuccess({ profile: response.profile })),
          catchError((error) => of(articleActions.followFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);
