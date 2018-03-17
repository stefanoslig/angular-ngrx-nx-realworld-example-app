import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromHome from './+state/home.reducer';
import * as fromAuth from '@angular-ngrx-nx-realworld-example-app/auth';
import { Home, HomeState } from './+state/home.interfaces';
import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/article';
import { homeInitialState } from './+state/home.init';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { tap } from 'rxjs/operators/tap';
import * as fromArticleList from '@angular-ngrx-nx-realworld-example-app/article-list';
import { ArticleListConfig } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { articleListInitialState } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { articleInitialState } from '@angular-ngrx-nx-realworld-example-app/article';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
	listConfig$: Observable<ArticleListConfig>;
	tags$: Observable<string[]>;
	isAuthenticated: boolean;
	unsubscribe$: Subject<void> = new Subject();

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.store
			.select(fromAuth.getLoggedIn)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(isLoggedIn => {
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

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
