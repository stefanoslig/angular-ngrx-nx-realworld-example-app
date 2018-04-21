import 'rxjs/add/operator/switchMap';

import { EditorService } from '../editor.service';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { concatMap } from 'rxjs/operators/concatMap';
import { map } from 'rxjs/operators/map';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { PublishArticle, LoadArticle, EditorActionsType } from './editor.actions';
import * as fromActions from './editor.actions';

@Injectable()
export class EditorEffects {
	@Effect()
	editor = this.actions.ofType<PublishArticle>(EditorActionsType.PUBLISH_ARTICLE).pipe(
		map(action => action.payload),
		withLatestFrom(this.store.select(fromNgrxForms.getData)),
		concatMap(([article, data]) =>
			this.editorService.publishArticle(data).pipe(
				map(result => ({ type: '[router] Go', payload: { path: ['article', result.slug] } })),
				catchError(result =>
					of({
						type: '[ngrxForms] SET_ERRORS',
						payload: result.error.errors
					})
				)
			)
		)
	);

	@Effect()
	loadArticle = this.actions.ofType<LoadArticle>(EditorActionsType.LOAD_ARTICLE).pipe(
		concatMap(action =>
			this.editorService.get(action.payload).pipe(
				map(results => new fromActions.LoadArticleSuccess(results)),
				catchError(error => of(new fromActions.LoadArticleFail(error)))
			)
		)
	);

	constructor(private actions: Actions, private store: Store<any>, private editorService: EditorService) { }
}
