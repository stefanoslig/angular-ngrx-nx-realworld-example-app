import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Profile } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';
import { Store } from '@ngrx/store';
import { articleListInitialState } from '@angular-ngrx-nx/article-list/src/+state/article-list.init';
import { ArticleListConfig } from '@angular-ngrx-nx/article-list/src/+state/article-list.interfaces';

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
		this.store.dispatch({
			type: '[article-list] SET_LIST_CONFIG',
			payload: <ArticleListConfig>{
				...articleListInitialState.listConfig,
				filters: {
					...articleListInitialState.listConfig.filters,
					author: username
				}
			}
		});
	}
}

@Injectable()
export class ProfileFavoritesResolverService implements Resolve<Profile> {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		const username = route.parent.params['username'];
		this.store.dispatch({
			type: '[article-list] SET_LIST_CONFIG',
			payload: <ArticleListConfig>{
				...articleListInitialState.listConfig,
				filters: {
					...articleListInitialState.listConfig.filters,
					favorited: username
				}
			}
		});
	}
}
