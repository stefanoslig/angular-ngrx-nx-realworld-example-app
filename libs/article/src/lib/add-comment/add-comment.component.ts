import { Article, User } from '@angular-ngrx-nx-realworld-example-app/api';
import { Field } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
