import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromHome from './+state/home.reducer';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Home, HomeState } from './+state/home.interfaces';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { homeInitialState } from '@angular-ngrx-nx/home/src/+state/home.init';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { tap } from 'rxjs/operators/tap';
import * as fromArticleList from '@angular-ngrx-nx/article-list/src/+state/article-list.reducer';
import { ArticleListConfig } from '@angular-ngrx-nx/article-list/src/+state/article-list.interfaces';
import { articleListInitialState } from '@angular-ngrx-nx/article-list/src/+state/article-list.init';
import { articleInitialState } from '@angular-ngrx-nx/article/src/+state/article.init';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	listConfig$: Observable<ArticleListConfig>;
	tags$: Observable<string[]>;
	isAuthenticated: boolean;

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.store.select(fromAuth.getLoggedIn).subscribe(isLoggedIn => {
			this.isAuthenticated = isLoggedIn;
			this.getArticles();
		});
		this.listConfig$ = this.store.select(fromArticleList.getListConfig);
		this.tags$ = this.store.select(fromHome.getTags);
	}

	setListTo(type: string = 'ALL') {
		this.store.dispatch({
			type: '[article-list] SET_LIST_CONFIG',
			payload: <ArticleListConfig>{
				...articleListInitialState.listConfig,
				type
			}
		});
	}

	getArticles() {
		if (this.isAuthenticated) {
			this.setListTo('FEED');
		} else {
			this.setListTo('ALL');
		}
	}

	setListTag(tag: string) {
		this.store.dispatch({
			type: '[article-list] SET_LIST_CONFIG',
			payload: <ArticleListConfig>{
				...articleListInitialState.listConfig,
				filters: {
					...articleListInitialState.listConfig.filters,
					tag
				}
			}
		});
	}
}
