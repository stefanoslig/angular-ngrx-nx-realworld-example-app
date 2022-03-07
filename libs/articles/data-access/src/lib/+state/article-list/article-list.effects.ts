import { ActionsService } from '@realworld/articles/data-access';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { ArticlesService } from '../../services/articles.service';
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
      ofType(ArticleListActions.favorite),
      concatMap(({ slug }) =>
        this.actionsService.favorite(slug).pipe(
          map((response) => ArticleListActions.favoriteSuccess({ article: response.article })),
          catchError((error) => of(ArticleListActions.favoriteFail(error))),
        ),
      ),
    ),
  );

  unFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleListActions.unFavorite),
      concatMap(({ slug }) =>
        this.actionsService.unfavorite(slug).pipe(
          map((response) => ArticleListActions.unFavoriteSuccess({ article: response.article })),
          catchError((error) => of(ArticleListActions.unFavoriteFail(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService,
    private actionsService: ActionsService,
    private facade: ArticlesListFacade,
  ) {}
}
