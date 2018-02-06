import 'rxjs/add/operator/switchMap';

import { EditorService } from '@angular-ngrx-nx/editor/src/editor.service';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { PublishArticle } from './editor.actions';

@Injectable()
export class EditorEffects {
  @Effect()
  editor = this.actions.ofType<PublishArticle>('[editor] PUBLISH_ARTICLE').pipe(
    withLatestFrom(this.store.select(fromNgrxForms.getData)),
    switchMap(([_, data]) =>
      this.editorService.publishArticle(data).pipe(
        map(result => {
          return { type: '[Router] Go', payload: { path: ['/'] } };
        })
      )
    )
  );
  constructor(private actions: Actions, private store: Store<any>, private editorService: EditorService) {}
}
