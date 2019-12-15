import { NgrxFormsFacade, SetErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';

import { EditorService } from '../editor.service';
import { EditorActionsType, LoadArticle, PublishArticle } from './editor.actions';
import * as fromActions from './editor.actions';

@Injectable()
export class EditorEffects {
  @Effect()
  editor = this.actions.pipe(
    ofType<PublishArticle>(EditorActionsType.PUBLISH_ARTICLE),
    withLatestFrom(this.ngrxFormsFacade.data$),
    concatMap(([_, data]) =>
      this.editorService.publishArticle(data).pipe(
        map(result => ({
          type: '[router] Go',
          payload: { path: ['article', result.slug] },
        })),
        catchError(result => of(new SetErrors(result.error.errors))),
      ),
    ),
  );

  @Effect()
  loadArticle = this.actions.pipe(
    ofType<LoadArticle>(EditorActionsType.LOAD_ARTICLE),
    concatMap(action =>
      this.editorService.get(action.payload).pipe(
        map(results => new fromActions.LoadArticleSuccess(results)),
        catchError(error => of(new fromActions.LoadArticleFail(error))),
      ),
    ),
  );

  constructor(
    private actions: Actions,
    private ngrxFormsFacade: NgrxFormsFacade,
    private editorService: EditorService,
  ) {}
}
