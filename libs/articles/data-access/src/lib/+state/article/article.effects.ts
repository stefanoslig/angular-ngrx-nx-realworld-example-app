import { ArticlesService } from '../../services/articles.service';
import { ActionsService } from '../../services/actions.service';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { articleActions } from './article.actions';
import { articlesActions } from '../articles.actions';

import { NgrxFormsFacade, setErrors, resetForm } from '@realworld/core/forms';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffects {
  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.loadArticle),
      concatMap((action) =>
        this.articlesService.getArticle(action.slug).pipe(
          map((response) => articleActions.loadArticleSuccess({ article: response.article })),
          catchError((error) => of(articleActions.loadArticleFailure(error))),
        ),
      ),
    ),
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.loadComments),
      concatMap((action) =>
        this.articlesService.getComments(action.slug).pipe(
          map((data) => articleActions.loadCommentsSuccess({ comments: data.comments })),
          catchError((error) => of(articleActions.loadCommentsFailure(error))),
        ),
      ),
    ),
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.deleteArticle),
      concatMap((action) =>
        this.articlesService.deleteArticle(action.slug).pipe(
          map(() => articleActions.deleteArticleSuccess()),
          catchError((error) => of(articleActions.deleteArticleFailure(error))),
        ),
      ),
    ),
  );

  deleteArticleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleActions.deleteArticleSuccess),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addComment),
      concatLatestFrom(() => this.ngrxFormsFacade.data$),
      exhaustMap(([{ slug }, data]) =>
        this.articlesService.addComment(slug, data.comment).pipe(
          map((response) => articleActions.addCommentSuccess({ comment: response.comment })),
          catchError(({ error }) => of(setErrors({ errors: error.errors }))),
        ),
      ),
    ),
  );

  addCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addCommentSuccess),
      map(() => resetForm()),
    ),
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.deleteComment),
      concatMap((action) =>
        this.articlesService.deleteComment(action.commentId, action.slug).pipe(
          map((_) => articleActions.deleteCommentSuccess({ commentId: action.commentId })),
          catchError((error) => of(articleActions.deleteCommentFailure(error))),
        ),
      ),
    ),
  );

  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.follow),
      concatMap(({ username }) =>
        this.actionsService.followUser(username).pipe(
          map((response) => articleActions.followSuccess({ profile: response.profile })),
          catchError((error) => of(articleActions.followFailure(error))),
        ),
      ),
    ),
  );

  unFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.unfollow),
      concatMap(({ username }) =>
        this.actionsService.unfollowUser(username).pipe(
          map((response) => articleActions.unfollowSuccess({ profile: response.profile })),
          catchError((error) => of(articleActions.unfollowFailure(error))),
        ),
      ),
    ),
  );

  favorite$ = createEffect(() =>
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

  unFavorite$ = createEffect(() =>
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
    private readonly actions$: Actions,
    private readonly articlesService: ArticlesService,
    private readonly actionsService: ActionsService,
    private readonly ngrxFormsFacade: NgrxFormsFacade,
    private readonly router: Router,
  ) {}
}
