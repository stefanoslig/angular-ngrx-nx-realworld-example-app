import { HomeState } from '@angular-ngrx-nx/home/src/+state/home.interfaces';
import { HomeService } from '@angular-ngrx-nx/home/src/home.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { LoadArticles, LoadTags, SetListConfig } from './home.actions';
import * as fromHome from './home.reducer';


@Injectable()
export class HomeEffects {

	@Effect()
	setListConfig = this.actions.ofType<SetListConfig>('[home] SET_LIST_CONFIG').pipe(
		map(() => ({ type: '[home] LOAD_ARTICLES' }))
	);

	@Effect()
	loadArticles = this.actions.ofType<LoadArticles>('[home] LOAD_ARTICLES').pipe(
		withLatestFrom(this.store.select(fromHome.getListConfig)),
		map(([_, config]) => {
			const filters = { ...config.filters, offset: config.filters.limit * (config.currentPage - 1) };
			return { ...config, filters };
		}),
		switchMap(config =>
			this.homeService.query(config).pipe(
				map(results => ({
					type: '[home] LOAD_ARTICLES_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[home] LOAD_ARTICLES_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	loadTags = this.actions.ofType<LoadTags>('[home] LOAD_TAGS').pipe(
		switchMap(() =>
			this.homeService.getTags().pipe(
				map(results => ({
					type: '[home] LOAD_TAGS_SUCCESS',
					payload: results.tags
				})),
				catchError(error =>
					of({
						type: '[home] LOAD_TAGS_FAIL',
						payload: error
					})
				)
			)
		)
	);

	constructor(private actions: Actions, private store: Store<HomeState>, private homeService: HomeService) { }
}
