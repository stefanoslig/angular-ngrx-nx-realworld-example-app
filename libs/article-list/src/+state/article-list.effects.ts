import 'rxjs/add/operator/switchMap';

import { ArticleListService } from '@angular-ngrx-nx/article-list/src/article-list.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { Favorite, LoadArticles, SetListConfig, SetListPage } from './article-list.actions';
import { ArticleListState } from './article-list.interfaces';
import * as fromArticleList from './article-list.reducer';
import { ActionsService } from '@angular-ngrx-nx/core/src/actions.service';

@Injectable()
export class ArticleListEffects {

	@Effect()
	setListPage = this.actions
		.ofType<SetListPage>('[article-list] SET_LIST_PAGE')
		.pipe(map(() => ({ type: '[article-list] LOAD_ARTICLES' })));

	@Effect()
	setListTag = this.actions
		.ofType<SetListConfig>('[article-list] SET_LIST_CONFIG')
		.pipe(map(() => ({ type: '[article-list] LOAD_ARTICLES' })));

	@Effect()
	loadArticles = this.actions.ofType<LoadArticles>('[article-list] LOAD_ARTICLES').pipe(
		withLatestFrom(this.store.select(fromArticleList.getListConfig)),
		switchMap(([_, config]) =>
			this.articleListService.query(config).pipe(
				map(results => ({
					type: '[article-list] LOAD_ARTICLES_SUCCESS',
					payload: { articles: results.articles, articlesCount: results.articlesCount }
				})),
				catchError(error =>
					of({
						type: '[article-list] LOAD_ARTICLES_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	favorite = this.actions.ofType<Favorite>('[article-list] FAVORITE').pipe(
		map(action => action.payload),
		switchMap(slug =>
			this.actionsService.favorite(slug).pipe(
				map(results => ({
					type: '[article-list] FAVORITE_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article-list] FAVORITE_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	unFavorite = this.actions.ofType<Favorite>('[article-list] UNFAVORITE').pipe(
		map(action => action.payload),
		switchMap(slug =>
			this.actionsService.unfavorite(slug).pipe(
				map(results => ({
					type: '[article-list] UNFAVORITE_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article-list] UNFAVORITE_FAIL',
						payload: error
					})
				)
			)
		)
	);

	constructor(
		private actions: Actions,
		private articleListService: ArticleListService,
		private actionsService: ActionsService,
		private store: Store<ArticleListState>
	) { }
}
