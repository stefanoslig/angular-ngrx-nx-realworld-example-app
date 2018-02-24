import { ArticleComment, ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Subject } from 'rxjs/Subject';

import * as fromArticle from './+state/article.reducer';

const structure: Field[] = [
	{
		type: 'TEXTAREA',
		name: 'comment',
		placeholder: 'Write a comment...',
		attrs: {
			rows: 3
		}
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
	currentUser$: Observable<User>;
	touchedForm$: Observable<boolean>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.article$ = this.store.select(fromArticle.getArticle);
		this.comments$ = this.store.select(fromArticle.getComments);
		this.isAuthenticated$ = this.store.select(fromAuth.getLoggedIn);
		this.currentUser$ = this.store.select(fromAuth.getUser);
		this.data$ = this.store.select(fromNgrxForms.getData);
		this.structure$ = this.store.select(fromNgrxForms.getStructure);
		this.touchedForm$ = this.store.select(fromNgrxForms.getTouchedForm);

		this.store.dispatch({ type: '[ngrxForms] SET_STRUCTURE', payload: structure });
		this.store.dispatch({ type: '[ngrxForms] SET_DATA', payload: '' });
		this.store
			.pipe(select(fromAuth.getAuth))
			.pipe(filter(auth => auth.loggedIn), withLatestFrom(this.article$), takeUntil(this.unsubscribe$))
			.subscribe(([auth, article]) => {
				this.canModify = auth.user.username === article.author.username;
			});
	}

	follow(username: string) {
		this.store.dispatch({ type: '[article] FOLLOW', payload: username });
	}
	unfollow(username: string) {
		this.store.dispatch({ type: '[article] UNFOLLOW', payload: username });
	}
	favorite(slug: string) {
		this.store.dispatch({ type: '[article] FAVORITE', payload: slug });
	}
	unfavorite(slug: string) {
		this.store.dispatch({ type: '[article] UNFAVORITE', payload: slug });
	}
	delete(slug: string) {
		this.store.dispatch({ type: '[article] DELETE_ARTICLE', payload: slug });
	}
	deleteComment(data: { commentId: number; slug: string }) {
		this.store.dispatch({ type: '[article] DELETE_COMMENT', payload: data });
	}
	updateForm(changes: any) {
		this.store.dispatch({ type: '[ngrxForms] UPDATE_DATA', payload: changes });
	}
	submit(slug: string) {
		this.store.dispatch({ type: '[article] ADD_COMMENT', payload: slug });
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.store.dispatch({
			type: '[article] INITIALIZE_ARTICLE'
		});
	}
}
