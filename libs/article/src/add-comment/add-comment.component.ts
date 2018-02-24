import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddCommentComponent {
	@Input() article: ArticleData;
	@Input() currentUser: User;
	@Input() data$: Observable<any>;
	@Input() structure$: Observable<Field[]>;
	@Input() touchedForm$: Observable<boolean>;
	@Output() submit: EventEmitter<string> = new EventEmitter();
	@Output() updateForm: EventEmitter<any> = new EventEmitter();
}
