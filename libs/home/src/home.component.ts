import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromHome from './+state/home.reducer';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { ArticleListConfig, Home, HomeState } from './+state/home.interfaces';
import { Article } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { homeInitialState } from '@angular-ngrx-nx/home/src/+state/home.init';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	listConfig$: Observable<ArticleListConfig>;
	articles$: Observable<Article[]>;
	tags$: Observable<string[]>;
	isAuthenticated: boolean;

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.store.select(fromAuth.getLoggedIn).subscribe(isLoggedIn => {
			this.isAuthenticated = isLoggedIn;
			this.getArticles();
		});
		this.listConfig$ = this.store.select(fromHome.getListConfig);
		this.articles$ = this.store.select(fromHome.getArticles);
		this.tags$ = this.store.select(fromHome.getTags);
	}

	setListTo(type: string) {
		if (type === 'FEED' && !this.isAuthenticated) {
			this.router.navigate([`/login`]);
			return;
		}

		this.store.dispatch({
			type: '[home] SET_LIST_CONFIG',
			payload: { type, currentPage: 1, filters: homeInitialState.listConfig.filters }
		});
	}

	getArticles() {
		if (this.isAuthenticated) {
			this.setListTo('FEED');
		} else {
			this.setListTo('ALL');
		}
	}
}
