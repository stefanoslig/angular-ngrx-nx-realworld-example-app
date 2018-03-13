import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as fromArticle from './+state/article.reducer';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import * as fromActions from './+state/article.actions';

@Injectable()
export class ArticleGuardService implements CanActivate {
	constructor(private store: Store<any>) { }

	waitForArticleToLoad(): Observable<boolean> {
		return this.store.pipe(select(fromArticle.getArticleLoaded), filter(loaded => loaded), take(1));
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		const slug = route.params['slug'];
		this.store.dispatch(new fromActions.LoadArticle(slug));

		return this.waitForArticleToLoad().pipe(
			tap(() => this.store.dispatch(new fromActions.LoadComments(slug)))
		);
	}
}
