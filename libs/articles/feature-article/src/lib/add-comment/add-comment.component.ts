import { Article, User } from '@realworld/core/api-types';
import { DynamicFormComponent, Field, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, Input, input, output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cdt-add-comment',
  standalone: true,
  templateUrl: './add-comment.component.html',
  imports: [ListErrorsComponent, DynamicFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  article = input.required<Article>();
  currentUser = input.required<User>();
  @Input() data$!: Observable<any>;
  @Input() structure$!: Observable<Field[]>;
  @Input() touchedForm$!: Observable<boolean>;
  submitComment = output<string>();
  updateForm = output<string>();
}
