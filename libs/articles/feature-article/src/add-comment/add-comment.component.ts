import { Article, User } from '@realworld/core/api-types';
import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cdt-add-comment',
  templateUrl: './add-comment.component.html',
  imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  private readonly fb = inject(FormBuilder);

  article = input.required<Article>();
  currentUser = input.required<User>();
  submitComment = output<string>();

  form = this.fb.nonNullable.group({
    comment: [''],
  });
}
