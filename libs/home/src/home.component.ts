import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromHome from './+state/home.reducer';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { ArticleListConfig, Home, HomeState, Filters } from './+state/home.interfaces';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { homeInitialState } from '@angular-ngrx-nx/home/src/+state/home.init';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { tap } from 'rxjs/operators/tap';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	listConfig$: Observable<ArticleListConfig>;
	articles$: Observable<ArticleData[]>;
	tags$: Observable<string[]>;
	isAuthenticated: boolean;
	totalPages: Array<number> = [1];

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.getTotalPages();
		this.store.select(fromAuth.getLoggedIn).subscribe(isLoggedIn => {
			this.isAuthenticated = isLoggedIn;
			this.getArticles();
		});
		this.listConfig$ = this.store.select(fromHome.getListConfig);
		this.articles$ = this.store.select(fromHome.getArticles);
		this.tags$ = this.store.select(fromHome.getTags);
	}

	setListTo(type: string = 'ALL') {
		if (type === 'FEED' && !this.isAuthenticated) {
			this.router.navigate([`/login`]);
			return;
		}

		this.store.dispatch({
			type: '[home] SET_LIST_TYPE',
			payload: type
		});
	}

	getArticles() {
		if (this.isAuthenticated) {
			this.setListTo('FEED');
		} else {
			this.setListTo('ALL');
		}
	}

	favorite(slug: string) {
		this.store.dispatch({
			type: '[home] FAVORITE',
			payload: slug
		})
	}

	unFavorite(slug: string) {
		this.store.dispatch({
			type: '[home] UNFAVORITE',
			payload: slug
		})
	}

	navigateToArticle(slug: string) {
		this.store.dispatch({ type: '[Router] Go', payload: { path: ['/article', slug] } })
	}

	getTotalPages() {
		this.store.select(fromHome.getArticlesCount).pipe(
			withLatestFrom(this.store.select(fromHome.getListConfig)))
			.subscribe(([articlesCount, config]) => {
				this.totalPages = Array.from(new Array(Math.ceil(articlesCount / config.filters.limit)), (val, index) => index + 1);
			})
	}

	setPage(page: number) {
		this.store.dispatch({
			type: '[home] SET_LIST_PAGE',
			payload: page
		});
	}

	setListTag(tag: string) {
		this.store.dispatch({
			type: '[home] SET_LIST_TAG',
			payload: tag
		});
	}
}
