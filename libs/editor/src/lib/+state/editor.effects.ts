import { NgrxFormsFacade, setErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { EditorService } from '../editor.service';
import * as EditorActions from './editor.actions';

@Injectable()
export class EditorEffects {
  publishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.publishArticle),
      concatLatestFrom(() => this.ngrxFormsFacade.data$),
      concatMap(([_, data]) =>
        this.editorService.publishArticle(data).pipe(
          tap((result) => this.router.navigate(['article', result.article.slug])),
          map(() => EditorActions.publishArticleSuccess()),
          catchError((result) => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.loadArticle),
      concatMap((action) =>
        this.editorService.get(action.id).pipe(
          map((response) => EditorActions.loadArticleSuccess({ article: response.article })),
          catchError((error) => of(EditorActions.loadArticleFail(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private ngrxFormsFacade: NgrxFormsFacade,
    private editorService: EditorService,
    private router: Router,
  ) {}
}
