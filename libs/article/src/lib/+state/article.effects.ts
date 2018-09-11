import { ArticleService } from '../article.service';
import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as fromActions from './article.actions';

import {
  AddComment,
  DeleteArticle,
  DeleteComment,
  Favorite,
  Follow,
  LoadArticle,
  LoadComments,
  UnFavorite,
  UnFollow,
  ArticleActionTypes
} from './article.actions';
import { NgrxFormsFacade, ResetForm, SetErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';

@Injectable()
export class ArticleEffects {
  @Effect()
  loadArticle = this.actions
    .ofType<LoadArticle>(ArticleActionTypes.LOAD_ARTICLE)
    .pipe(
      concatMap(action =>
        this.articleService
          .get(action.payload)
          .pipe(
            map(results => new fromActions.LoadArticleSuccess(results)),
            catchError(error => of(new fromActions.LoadArticleFail(error)))
          )
      )
    );

  @Effect()
  loadComments = this.actions
    .ofType<LoadComments>(ArticleActionTypes.LOAD_COMMENTS)
    .pipe(
      concatMap(action =>
        this.articleService
          .getComments(action.payload)
          .pipe(
            map(results => new fromActions.LoadCommentsSuccess(results)),
            catchError(error => of(new fromActions.LoadCommentsFail(error)))
          )
      )
    );

  @Effect()
  deleteArticle = this.actions
    .ofType<DeleteArticle>(ArticleActionTypes.DELETE_ARTICLE)
    .pipe(
      concatMap(action =>
        this.articleService
          .deleteArticle(action.payload)
          .pipe(
            map(_ => ({ type: '[router] Go', payload: { path: ['/'] } })),
            catchError(error => of(new fromActions.DeleteArticleFail(error)))
          )
      )
    );

  @Effect()
  addComment = this.actions
    .ofType<AddComment>(ArticleActionTypes.ADD_COMMENT)
    .pipe(
      map(action => action.payload),
      withLatestFrom(this.ngrxFormsFacade.data$, this.ngrxFormsFacade.structure$),
      exhaustMap(([slug, data, structure]) =>
        this.articleService
          .addComment(slug, data.comment)
          .pipe(
            mergeMap(comment => [new fromActions.AddCommentSuccess(comment), new ResetForm()]),
            catchError(result => of(new SetErrors(result.error.errors)))
          )
      )
    );

  @Effect()
  deleteComment = this.actions
    .ofType<DeleteComment>(ArticleActionTypes.DELETE_COMMENT)
    .pipe(
      map(action => action.payload),
      concatMap(data =>
        this.articleService
          .deleteComment(data.commentId, data.slug)
          .pipe(
            map(_ => new fromActions.DeleteCommentSuccess(data.commentId)),
            catchError(error => of(new fromActions.DeleteCommentFail(error)))
          )
      )
    );

  @Effect()
  follow = this.actions
    .ofType<Follow>(ArticleActionTypes.FOLLOW)
    .pipe(
      map(action => action.payload),
      concatMap(slug =>
        this.actionsService
          .followUser(slug)
          .pipe(
            map(results => new fromActions.FollowSuccess(results)),
            catchError(error => of(new fromActions.FollowFail(error)))
          )
      )
    );

  @Effect()
  unFollow = this.actions
    .ofType<UnFollow>(ArticleActionTypes.UNFOLLOW)
    .pipe(
      map(action => action.payload),
      concatMap(slug =>
        this.actionsService
          .unfollowUser(slug)
          .pipe(
            map(results => new fromActions.UnFollowSuccess(results)),
            catchError(error => of(new fromActions.UnFollowFail(error)))
          )
      )
    );

  @Effect()
  favorite = this.actions
    .ofType<Favorite>(ArticleActionTypes.FAVORITE)
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
    .ofType<UnFavorite>(ArticleActionTypes.UNFAVORITE)
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
    private articleService: ArticleService,
    private actionsService: ActionsService,
    private ngrxFormsFacade: NgrxFormsFacade
  ) {}
}
