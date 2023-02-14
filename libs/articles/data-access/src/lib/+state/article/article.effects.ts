import { ArticlesService } from '../../services/articles.service';
import { ActionsService } from '../../services/actions.service';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { articleActions } from './article.actions';
import { articlesActions } from '../articles.actions';
import { Router } from '@angular/router';
import { formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { Store } from '@ngrx/store';

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

  constructor(
    private readonly actions$: Actions,
    private readonly articlesService: ArticlesService,
    private readonly actionsService: ActionsService,
    private readonly store: Store,
    private readonly router: Router,
  ) {}
}
