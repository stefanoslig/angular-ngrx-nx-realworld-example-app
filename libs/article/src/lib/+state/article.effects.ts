import { ArticleService } from '../article.service';
import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as ArticleActions from './article.actions';

import { NgrxFormsFacade, setErrors, resetForm } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { go } from '@angular-ngrx-nx-realworld-example-app/ngrx-router';

@Injectable()
export class ArticleEffects {
  loadArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      concatMap(action =>
        this.articleService.getArticle(action.slug).pipe(
          map(response => ArticleActions.loadArticleSuccess({ article: response.article })),
          catchError(error => of(ArticleActions.loadArticleFail(error))),
        ),
      ),
    ),
  );

  loadComments = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadComments),
      concatMap(action =>
        this.articleService.getComments(action.slug).pipe(
          map(data => ArticleActions.loadCommentsSuccess({ comments: data.comments })),
          catchError(error => of(ArticleActions.loadCommentsFail(error))),
        ),
      ),
    ),
  );

  deleteArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      concatMap(action =>
        this.articleService.deleteArticle(action.slug).pipe(
          map(_ => go({ to: { path: ['/'] } })),
          catchError(error => of(ArticleActions.deleteArticleFail(error))),
        ),
      ),
    ),
  );

  addComment = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.addComment),
      map(action => action.slug),
      withLatestFrom(this.ngrxFormsFacade.data$, this.ngrxFormsFacade.structure$),
      exhaustMap(([slug, data, structure]) =>
        this.articleService.addComment(slug, data.comment).pipe(
          mergeMap(response => [ArticleActions.addCommentSuccess({ comment: response.comment }), resetForm()]),
          catchError(result => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  deleteComment = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteComment),
      concatMap(action =>
        this.articleService.deleteComment(action.commentId, action.slug).pipe(
          map(_ => ArticleActions.deleteCommentSuccess({ commentId: action.commentId })),
          catchError(error => of(ArticleActions.deleteCommentFail(error))),
        ),
      ),
    ),
  );

  follow = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.follow),
      map(action => action.username),
      concatMap(username =>
        this.actionsService.followUser(username).pipe(
          map(response => ArticleActions.followSuccess({ profile: response.profile })),
          catchError(error => of(ArticleActions.followFail(error))),
        ),
      ),
    ),
  );

  unFollow = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.unFollow),
      map(action => action.username),
      concatMap(username =>
        this.actionsService.unfollowUser(username).pipe(
          map(response => ArticleActions.unFollowSuccess({ profile: response.profile })),
          catchError(error => of(ArticleActions.unFollowFail(error))),
        ),
      ),
    ),
  );

  favorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.favorite),
      map(action => action.slug),
      concatMap(slug =>
        this.actionsService.favorite(slug).pipe(
          map(response => ArticleActions.favoriteSuccess({ article: response.article })),
          catchError(error => of(ArticleActions.favoriteFail(error))),
        ),
      ),
    ),
  );

  unFavorite = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.unFavorite),
      map(action => action.slug),
      concatMap(slug =>
        this.actionsService.unfavorite(slug).pipe(
          map(response => ArticleActions.unFavoriteSuccess({ article: response.article })),
          catchError(error => of(ArticleActions.unFavoriteFail(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private actionsService: ActionsService,
    private ngrxFormsFacade: NgrxFormsFacade,
  ) {}
}
