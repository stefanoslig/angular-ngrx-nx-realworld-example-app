import { ActionsService } from '@realworld/articles/data-access';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { ArticlesService } from '../../services/articles.service';
import { articleListActions } from './article-list.actions';
import { articlesActions } from '../articles.actions';

import { ArticlesFacade } from '../articles.facade';

@Injectable()
export class ArticleListEffects {
  setListPage = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.setListPage),
      map(() => articleListActions.loadArticles()),
    ),
  );

  setListTag = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.setListConfig),
      map(() => articleListActions.loadArticles()),
    ),
  );

  loadArticles = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.loadArticles),
      concatLatestFrom(() => this.facade.listConfig$),
      concatMap(([_, config]) =>
        this.articlesService.query(config).pipe(
          map((results) =>
            articleListActions.loadArticlesSuccess({
              articles: results.articles,
              articlesCount: results.articlesCount,
            }),
          ),
          catchError((error) => of(articleListActions.loadArticlesFailure({ error }))),
        ),
      ),
    ),
  );

  favorite = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.favorite),
      concatMap(({ slug }) =>
        this.actionsService.favorite(slug).pipe(
          map((response) => articlesActions.favoriteSuccess({ article: response.article })),
          catchError((error) => of(articlesActions.favoriteFailure(error))),
        ),
      ),
    ),
  );

  unFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.unfavorite),
      concatMap(({ slug }) =>
        this.actionsService.unfavorite(slug).pipe(
          map((response) => articlesActions.unfavoriteSuccess({ article: response.article })),
          catchError((error) => of(articlesActions.unfavoriteFailure(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService,
    private actionsService: ActionsService,
    private facade: ArticlesFacade,
  ) {}
}
