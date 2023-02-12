import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { articleListActions } from './article-list.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ArticlesService } from '../../services/articles.service';
import { articleListQuery } from './article-list.selectors';
import { articlesActions } from '../articles.actions';
import { ActionsService } from '../../services/actions.service';

export const setListPage$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleListActions.setListPage),
      map(() => articleListActions.loadArticles()),
    );
  },
  { functional: true },
);

export const setListTag$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleListActions.setListConfig),
      map(() => articleListActions.loadArticles()),
    );
  },
  { functional: true },
);

export const loadArticles$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articleListActions.loadArticles),
      concatLatestFrom(() => store.select(articleListQuery.selectListConfig)),
      concatMap(([_, config]) =>
        articlesService.query(config).pipe(
          map((results) =>
            articleListActions.loadArticlesSuccess({
              articles: results.articles,
              articlesCount: results.articlesCount,
            }),
          ),
          catchError((error) => of(articleListActions.loadArticlesFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

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
