import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { RouterState, RouterStateUrl } from './router.interfaces';

export const routerReducer: ActionReducerMap<RouterState> = {
	routerReducer: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<
	fromRouter.RouterReducerState<RouterStateUrl>
	>('routerReducer');

export class CustomSerializer
	implements fromRouter.RouterStateSerializer<RouterStateUrl> {
	serialize(routerState: RouterStateSnapshot): RouterStateUrl {
		const { url } = routerState;
		const { queryParams } = routerState.root;

		let state: ActivatedRouteSnapshot = routerState.root;
		while (state.firstChild) {
			state = state.firstChild;
		}
		const { params } = state;

		return { url, queryParams, params };
	}
}