import { Article, User } from '@realworld/core/api-types';
import { DynamicFormComponent, Field, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cdt-add-comment',
  standalone: true,
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  imports: [ListErrorsComponent, DynamicFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  @Input() article!: Article;
  @Input() currentUser!: User;
  @Input() data$!: Observable<any>;
  @Input() structure$!: Observable<Field[]>;
  @Input() touchedForm$!: Observable<boolean>;
  @Output() submitComment: EventEmitter<string> = new EventEmitter();
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
}
