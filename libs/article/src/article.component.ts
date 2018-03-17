import { ArticleComment, ArticleData } from '@angular-ngrx-nx-realworld-example-app/article/src/+state/article.interfaces';
import { User } from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromAuth from '@angular-ngrx-nx-realworld-example-app/auth';
import { Field } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Subject } from 'rxjs/Subject';

import * as fromArticle from './+state/article.reducer';
import * as fromActions from './+state/article.actions';

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

	follow(username: string) { this.store.dispatch(new fromActions.Follow(username)) }
	unfollow(username: string) { this.store.dispatch(new fromActions.UnFollow(username)) }
	favorite(slug: string) { this.store.dispatch(new fromActions.Favorite(slug)) }
	unfavorite(slug: string) { this.store.dispatch(new fromActions.UnFavorite(slug)) }
	delete(slug: string) { this.store.dispatch(new fromActions.DeleteArticle(slug)) }
	deleteComment(data: { commentId: number; slug: string }) { this.store.dispatch(new fromActions.DeleteComment(data)) }
	updateForm(changes: any) { this.store.dispatch({ type: '[ngrxForms] UPDATE_DATA', payload: changes }) }
	submit(slug: string) { this.store.dispatch(new fromActions.AddComment(slug)) }

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.store.dispatch(new fromActions.InitializeArticle());
	}
}
