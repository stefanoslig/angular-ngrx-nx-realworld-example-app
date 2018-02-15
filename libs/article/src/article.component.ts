import { ArticleData, ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromArticle from './+state/article.reducer';

const structure: Field[] = [
	{
		type: 'TEXTAREA',
		name: 'comment',
		placeholder: 'Password'
	}
];

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
	article$: Observable<ArticleData>;
	comments$: Observable<ArticleComment[]>;
	isAuthenticated$: Observable<boolean>;
	structure$: Observable<Field[]>;
	data$: Observable<any>;

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
	}
}
