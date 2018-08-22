import { ArticleListService } from '../article-list.service';
import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { Favorite, LoadArticles, SetListConfig, SetListPage, ArticleListActionTypes } from './article-list.actions';
import { ArticleListState } from './article-list.interfaces';
import * as fromArticleList from './article-list.reducer';
import * as fromActions from './article-list.actions';

@Injectable()
export class ArticleListEffects {
  @Effect()
  setListPage = this.actions
    .ofType<SetListPage>(ArticleListActionTypes.SET_LIST_PAGE)
    .pipe(map(() => ({ type: ArticleListActionTypes.LOAD_ARTICLES })));

  @Effect()
  setListTag = this.actions
    .ofType<SetListConfig>(ArticleListActionTypes.SET_LIST_CONFIG)
    .pipe(map(() => new fromActions.LoadArticles()));

  @Effect()
  loadArticles = this.actions.ofType<LoadArticles>(ArticleListActionTypes.LOAD_ARTICLES).pipe(
    withLatestFrom(this.store.select(fromArticleList.getListConfig)),
    concatMap(([_, config]) =>
      this.articleListService.query(config).pipe(
        map(
          results =>
            new fromActions.LoadArticlesSuccess({
              articles: results.articles,
              articlesCount: results.articlesCount
            })
        ),
        catchError(error => of(new fromActions.LoadArticlesFail(error)))
      )
    )
  );

  @Effect()
  favorite = this.actions
    .ofType<Favorite>(ArticleListActionTypes.FAVORITE)
    .pipe(
      map(action => action.payload),
      concatMap(slug =>
        this.actionsService
          .favorite(slug)
          .pipe(
            map(results => new fromActions.FavoriteSuccess(results)),
            catchError(error => of(new fromActions.FavoriteFail(error)))
          )
      )
    );

  @Effect()
  unFavorite = this.actions
    .ofType<Favorite>(ArticleListActionTypes.UNFAVORITE)
    .pipe(
      map(action => action.payload),
      concatMap(slug =>
        this.actionsService
          .unfavorite(slug)
          .pipe(
            map(results => new fromActions.UnFavoriteSuccess(results)),
            catchError(error => of(new fromActions.UnFavoriteFail(error)))
          )
      )
    );

  constructor(
    private actions: Actions,
    private articleListService: ArticleListService,
    private actionsService: ActionsService,
    private store: Store<ArticleListState>
  ) {}
}
