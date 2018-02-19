import { ArticleData, ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromArticle from './+state/article.reducer';
import { Subject } from 'rxjs/Subject';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { map } from 'rxjs/operators/map';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';
import { Profile } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';

const structure: Field[] = [
	{
		type: 'TEXTAREA',
		name: 'comment',
		placeholder: 'Write a comment...'
	}
];

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit, OnDestroy {
	article$: Observable<ArticleData>;
	comments$: Observable<ArticleComment[]>;
	canModify = false;
	isAuthenticated$: Observable<boolean>;
	structure$: Observable<Field[]>;
	data$: Observable<any>;
	unsubscribe$ = new Subject<void>();

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.article$ = this.store.select(fromArticle.getArticle);
		this.comments$ = this.store.select(fromArticle.getComments);
		this.isAuthenticated$ = this.store.select(fromAuth.getLoggedIn);

		this.store.dispatch({
			type: '[ngrxForms] SET_STRUCTURE',
			payload: structure
		});
		this.data$ = this.store.select(fromNgrxForms.getData);
		this.structure$ = this.store.select(fromNgrxForms.getStructure);

		this.store.pipe(select(fromAuth.getAuth)).pipe(
			filter(auth => auth.loggedIn),
			withLatestFrom(this.article$),
			takeUntil(this.unsubscribe$)
		).subscribe(([auth, article]) => {
			this.canModify = (auth.user.username === article.author.username);
		})
	}

	follow(username: string) {
		this.store.dispatch({
			type: '[article] FOLLOW',
			payload: username
		});
	}

	unfollow(username: string) {
		this.store.dispatch({
			type: '[article] UNFOLLOW',
			payload: username
		});
	}

	favorite(slug: string) {
		this.store.dispatch({
			type: '[article] FAVORITE',
			payload: slug
		});
	}

	unfavorite(slug: string) {
		this.store.dispatch({
			type: '[article] UNFAVORITE',
			payload: slug
		});
	}

	delete(slug: string) {
		this.store.dispatch({
			type: '[article] DELETE_ARTICLE',
			payload: slug
		});
	}

	deleteComment(data: { commentId: number, slug: string }) {
		this.store.dispatch({
			type: '[article] DELETE_COMMENT',
			payload: data
		});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.store.dispatch({
			type: '[article] INITIALIZE_ARTICLE'
		});
	}
}
