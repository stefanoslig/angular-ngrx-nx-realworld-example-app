import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { ArticleListService } from '../article-list.service';
import * as ArticleListActions from './article-list.actions';

import { ArticleListFacade } from './article-list.facade';

@Injectable()
export class ArticleListEffects {
  setListPage = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleListActions.setListPage),
      map(() => ArticleListActions.loadArticles()),
    ),
  );

  setListTag = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleListActions.setListConfig),
      map(() => ArticleListActions.loadArticles()),
    ),
  );

  loadArticles = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleListActions.loadArticles),
      withLatestFrom(this.facade.listConfig$),
      concatMap(([_, config]) =>
        this.articleListService.query(config).pipe(
          map(results =>
            ArticleListActions.loadArticlesSuccess({
              articles: results.articles,
              articlesCount: results.articlesCount,
            }),
          ),
          catchError(error => of(ArticleListActions.loadArticlesFail({ error }))),
        ),
      ),
    ),
  );

  favorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleListActions.favorite),
      map(action => action.slug),
      concatMap(slug =>
        this.actionsService.favorite(slug).pipe(
          map(response => ArticleListActions.favoriteSuccess({ article: response.article })),
          catchError(error => of(ArticleListActions.favoriteFail(error))),
        ),
      ),
    ),
  );

  unFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleListActions.unFavorite),
      map(action => action.slug),
      concatMap(slug =>
        this.actionsService.unfavorite(slug).pipe(
          map(response => ArticleListActions.unFavoriteSuccess({ article: response.article })),
          catchError(error => of(ArticleListActions.unFavoriteFail(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private articleListService: ArticleListService,
    private actionsService: ActionsService,
    private facade: ArticleListFacade,
  ) {}
}
