import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { ArticleState } from './article.interfaces';
import { LoadArticle, LoadArticleFail, LoadArticleSuccess } from './article.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { ArticleService } from '@angular-ngrx-nx/article/src/article.service';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ArticleEffects {
	@Effect()
	loadArticles = this.actions.ofType<LoadArticle>('[article] LOAD_ARTICLE').pipe(
		switchMap(action =>
			this.articleService.get(action.payload).pipe(
				map(results => ({
					type: '[article] LOAD_ARTICLE_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article] LOAD_ARTICLE_FAIL',
						payload: error
					})
				)
			)
		)
	);

	constructor(private actions: Actions, private dataPersistence: DataPersistence<ArticleState>, private articleService: ArticleService) { }
}
