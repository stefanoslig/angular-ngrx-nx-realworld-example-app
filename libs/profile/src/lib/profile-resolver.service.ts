import { ArticleListConfig, articleListInitialState } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { Profile } from './+state/profile.interfaces';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromArticleList from '@angular-ngrx-nx-realworld-example-app/article-list';

@Injectable()
export class ProfileResolverService implements Resolve<Profile> {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		const username = route.params['username'];
		this.store.dispatch({
			type: '[profile] GET_PROFILE',
			payload: username
		});
	}
}

@Injectable()
export class ProfileArticlesResolverService implements Resolve<Profile> {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		const username = route.params['username'];
		this.store.dispatch(
			new fromArticleList.SetListConfig(<ArticleListConfig>{
				...articleListInitialState.listConfig,
				filters: {
					...articleListInitialState.listConfig.filters,
					author: username
				}
			})
		);
	}
}

@Injectable()
export class ProfileFavoritesResolverService implements Resolve<Profile> {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		const username = route.parent.params['username'];
		this.store.dispatch(
			new fromArticleList.SetListConfig(<ArticleListConfig>{
				...articleListInitialState.listConfig,
				filters: {
					...articleListInitialState.listConfig.filters,
					favorited: username
				}
			})
		);
	}
}
