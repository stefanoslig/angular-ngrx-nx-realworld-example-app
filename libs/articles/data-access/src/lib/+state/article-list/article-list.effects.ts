import { ActionsService } from '@realworld/articles/data-access';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { ArticlesService } from '../../services/articles.service';
import * as ArticleListActions from './article-list.actions';
import * as ArticlesActions from '../articles.actions';

import { ArticlesFacade } from '../articles.facade';

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
      concatLatestFrom(() => this.facade.listConfig$),
      concatMap(([_, config]) =>
        this.articlesService.query(config).pipe(
          map((results) =>
            ArticleListActions.loadArticlesSuccess({
              articles: results.articles,
              articlesCount: results.articlesCount,
            }),
          ),
          catchError((error) => of(ArticleListActions.loadArticlesFail({ error }))),
        ),
      ),
    ),
  );

  favorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.favorite),
      concatMap(({ slug }) =>
        this.actionsService.favorite(slug).pipe(
          map((response) => ArticlesActions.favoriteSuccess({ article: response.article })),
          catchError((error) => of(ArticlesActions.favoriteFail(error))),
        ),
      ),
    ),
  );

  unFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.unFavorite),
      concatMap(({ slug }) =>
        this.actionsService.unfavorite(slug).pipe(
          map((response) => ArticlesActions.unFavoriteSuccess({ article: response.article })),
          catchError((error) => of(ArticlesActions.unFavoriteFail(error))),
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
