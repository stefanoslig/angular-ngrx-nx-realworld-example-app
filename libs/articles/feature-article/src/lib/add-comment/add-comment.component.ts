import { Article, User } from '@realworld/core/api-types';
import { Field } from '@realworld/core/forms';
import { DynamicFormComponent } from '@realworld/core/forms/src/lib/dynamic-form/dynamic-form.component';
import { ListErrorsComponentModule } from '@realworld/core/forms/src/lib/list-errors/list-errors.component';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  imports: [ListErrorsComponentModule, DynamicFormComponent],
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
