import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromHome from './+state/home.reducer';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { ArticleListConfig, Home, HomeState } from './+state/home.interfaces';
import { Article } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

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
		this.listConfig$ = this.store.select(fromHome.getListConfig);
		this.store.select(fromAuth.getLoggedIn).subscribe(isLoggedIn => (this.isAuthenticated = isLoggedIn));
		this.articles$ = this.store.select(fromHome.getArticles);
		this.tags$ = this.store.select(fromHome.getTags);
	}

	setListTo(type: string) {
		if (type === 'FEED' && !this.isAuthenticated) {
			this.router.navigate([`/login`]);
			return;
		}

		this.store.dispatch({
			type: 'SET_LIST_CONFIG',
			payload: {
				type: type
			}
		});
	}

	getArticles() {
		// if (this.limit) {
		//   this.query.filters.limit = this.limit;
		//   this.query.filters.offset =  (this.limit * (this.currentPage - 1));
		// }
		// this.articlesService.query(this.query)
		// .subscribe(data => {
		//   this.loading = false;
		//   this.results = data.articles;
		//   // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
		//   this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
	}
}
