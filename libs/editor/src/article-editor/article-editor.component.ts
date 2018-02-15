import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';

const structure: Field[] = [
	{
		type: 'INPUT',
		name: 'title',
		placeholder: 'Article Title',
		validator: [Validators.required]
	},
	{
		type: 'INPUT',
		name: 'description',
		placeholder: "What's this article about?",
		validator: [Validators.required]
	},
	{
		type: 'TEXTAREA',
		name: 'body',
		placeholder: 'Write your article (in markdown)',
		validator: [Validators.required]
	},
	{
		type: 'INPUT',
		name: 'tagList',
		placeholder: 'Enter Tags',
		validator: []
	}
];

@Component({
	selector: 'app-article-editor',
	templateUrl: './article-editor.component.html',
	styleUrls: ['./article-editor.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleEditorComponent implements OnInit {
	structure$: Observable<Field[]>;
	data$: Observable<any>;

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.store.dispatch({
			type: '[ngrxForms] SET_STRUCTURE',
			payload: structure
		});
		this.data$ = this.store.select(fromNgrxForms.getData);
		this.structure$ = this.store.select(fromNgrxForms.getStructure);
	}

	updateForm(changes: any) {
		this.store.dispatch({
			type: '[ngrxForms] SET_DATA',
			payload: changes
		});
	}

	submit() {
		this.store.dispatch({
			type: '[editor] PUBLISH_ARTICLE'
		});
	}
}
