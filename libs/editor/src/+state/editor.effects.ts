import 'rxjs/add/operator/switchMap';

import { EditorService } from '@angular-ngrx-nx/editor/src/editor.service';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { concatMap } from 'rxjs/operators/concatMap';
import { map } from 'rxjs/operators/map';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { PublishArticle } from './editor.actions';

@Injectable()
export class EditorEffects {
	@Effect()
	editor = this.actions.ofType<PublishArticle>('[editor] PUBLISH_ARTICLE').pipe(
		withLatestFrom(this.store.select(fromNgrxForms.getData)),
		concatMap(([_, data]) =>
			this.editorService.publishArticle(data).pipe(
				map(result => ({ type: '[Router] Go', payload: { path: ['/'] } })),
				catchError(result =>
					of({
						type: '[ngrxForms] SET_ERRORS',
						payload: result.error.errors
					})
				)
			)
		)
	);

	constructor(private actions: Actions, private store: Store<any>, private editorService: EditorService) { }
}
