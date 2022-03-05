import { Article, User } from '@realworld/core/api-types';
import { Field } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { DynamicFormComponentModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms/src/lib/dynamic-form/dynamic-form.component';
import { ListErrorsComponentModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms/src/lib/list-errors/list-errors.component';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  @Input() article: Article;
  @Input() currentUser: User;
  @Input() data$: Observable<any>;
  @Input() structure$: Observable<Field[]>;
  @Input() touchedForm$: Observable<boolean>;
  @Output() submitComment: EventEmitter<string> = new EventEmitter();
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
}

@NgModule({
  imports: [ListErrorsComponentModule, DynamicFormComponentModule],
  declarations: [AddCommentComponent],
  exports: [AddCommentComponent],
})
export class AddCommentComponentModule {}
