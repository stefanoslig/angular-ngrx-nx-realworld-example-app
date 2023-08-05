import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of, tap } from 'rxjs';
import { ActionsService } from '../../services/actions.service';
import { articleActions } from './article.actions';
import { ArticlesService } from '../../services/articles.service';
import { formsActions, ngrxFormsQuery } from '@realworld/core/forms/src';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

export const unFollow$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articleActions.unfollow),
      concatMap(({ username }) =>
        actionsService.unfollowUser(username).pipe(
          map((response) => articleActions.unfollowSuccess({ profile: response.profile })),
          catchError((error) => of(articleActions.unfollowFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const follow$ = createEffect(
  (actions$ = inject(Actions), actionsService = inject(ActionsService)) => {
    return actions$.pipe(
      ofType(articleActions.follow),
      concatMap(({ username }) =>
        actionsService.followUser(username).pipe(
          map((response) => articleActions.followSuccess({ profile: response.profile })),
          catchError((error) => of(articleActions.followFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteComment$ = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articleActions.deleteComment),
      concatMap(({ commentId, slug }) =>
        articlesService.deleteComment(commentId, slug).pipe(
          map((_) => articleActions.deleteCommentSuccess({ commentId })),
          catchError((error) => of(articleActions.deleteCommentFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const addComment$ = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(articleActions.addComment),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      exhaustMap(([{ slug }, data]) =>
        articlesService.addComment(slug, data.comment).pipe(
          map((response) => articleActions.addCommentSuccess({ comment: response.comment })),
          catchError(({ error }) => of(formsActions.setErrors({ errors: error.errors }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const addCommentSuccess$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleActions.addCommentSuccess),
      map(() => formsActions.resetForm()),
    );
  },
  { functional: true },
);

export const loadArticle$ = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articleActions.loadArticle),
      concatMap((action) =>
        articlesService.getArticle(action.slug).pipe(
          map((response) => articleActions.loadArticleSuccess({ article: response.article })),
          catchError((error) => of(articleActions.loadArticleFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const loadComments$ = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articleActions.loadComments),
      concatMap((action) =>
        articlesService.getComments(action.slug).pipe(
          map((data) => articleActions.loadCommentsSuccess({ comments: data.comments })),
          catchError((error) => of(articleActions.loadCommentsFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteArticle$ = createEffect(
  (actions$ = inject(Actions), articlesService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      concatMap((action) =>
        articlesService.deleteArticle(action.slug).pipe(
          map(() => articleActions.deleteArticleSuccess()),
          catchError((error) => of(articleActions.deleteArticleFailure(error))),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteArticleSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => router.navigate(['/'])),
    );
  },
  { functional: true, dispatch: false },
);
