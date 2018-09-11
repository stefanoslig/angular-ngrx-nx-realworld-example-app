import { NgrxFormsFacade, SetErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { EditorService } from '../editor.service';
import { EditorActionsType, LoadArticle, PublishArticle } from './editor.actions';
import * as fromActions from './editor.actions';

@Injectable()
export class EditorEffects {
  @Effect()
  editor = this.actions
    .ofType<PublishArticle>(EditorActionsType.PUBLISH_ARTICLE)
    .pipe(
      withLatestFrom(this.ngrxFormsFacade.data$),
      concatMap(([_, data]) =>
        this.editorService
          .publishArticle(data)
          .pipe(
            map(result => ({ type: '[router] Go', payload: { path: ['article', result.slug] } })),
            catchError(result => of(new SetErrors(result.error.errors)))
          )
      )
    );

  @Effect()
  loadArticle = this.actions
    .ofType<LoadArticle>(EditorActionsType.LOAD_ARTICLE)
    .pipe(
      concatMap(action =>
        this.editorService
          .get(action.payload)
          .pipe(
            map(results => new fromActions.LoadArticleSuccess(results)),
            catchError(error => of(new fromActions.LoadArticleFail(error)))
          )
      )
    );

  constructor(
    private actions: Actions,
    private ngrxFormsFacade: NgrxFormsFacade,
    private editorService: EditorService
  ) {}
}
