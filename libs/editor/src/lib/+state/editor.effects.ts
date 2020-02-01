import { NgrxFormsFacade, setErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { EditorService } from '../editor.service';
import * as EditorActions from './editor.actions';
import { go } from '@angular-ngrx-nx-realworld-example-app/ngrx-router';

@Injectable()
export class EditorEffects {
  publishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.publishArticle),
      withLatestFrom(this.ngrxFormsFacade.data$),
      concatMap(([_, data]) =>
        this.editorService.publishArticle(data).pipe(
          // TODO dispatch this action from the router facade when you refactor
          map(result =>
            go({
              to: { path: ['article', result.article.slug] },
            }),
          ),
          catchError(result => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.loadArticle),
      concatMap(action =>
        this.editorService.get(action.id).pipe(
          map(response => EditorActions.loadArticleSuccess({ article: response.article })),
          catchError(error => of(EditorActions.loadArticleFail(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private ngrxFormsFacade: NgrxFormsFacade,
    private editorService: EditorService,
  ) {}
}
