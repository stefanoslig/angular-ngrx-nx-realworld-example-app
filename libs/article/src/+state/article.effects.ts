import 'rxjs/add/operator/switchMap';

import { ArticleService } from '@angular-ngrx-nx/article/src/article.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

import { LoadArticle, LoadComments } from './article.actions';
import { ArticleState } from './article.interfaces';

@Injectable()
export class ArticleEffects {
  @Effect()
  loadArticles = this.actions.ofType<LoadArticle>('[article] LOAD_ARTICLE').pipe(
    switchMap(action =>
      this.articleService.get(action.payload).pipe(
        map(results => ({
          type: '[article] LOAD_ARTICLE_SUCCESS',
          payload: results
        })),
        catchError(error =>
          of({
            type: '[article] LOAD_ARTICLE_FAIL',
            payload: error
          })
        )
      )
    )
  );

  @Effect()
  loadComments = this.actions.ofType<LoadComments>('[article] LOAD_COMMENTS').pipe(
    switchMap(action =>
      this.articleService.getComments(action.payload).pipe(
        map(results => ({
          type: '[article] LOAD_COMMENTS_SUCCESS',
          payload: results
        })),
        catchError(error =>
          of({
            type: '[article] LOAD_COMMENTS_FAIL',
            payload: error
          })
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<ArticleState>,
    private articleService: ArticleService
  ) {}
}
