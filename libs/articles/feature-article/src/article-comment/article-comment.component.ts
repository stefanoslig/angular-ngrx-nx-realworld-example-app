import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Article, User } from '@realworld/core/api-types';
import { Comment } from '@realworld/articles/data-access';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cdt-article-comment',
  templateUrl: './article-comment.component.html',
  imports: [DatePipe, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  currentUser = input.required<User>();
  comment = input.required<Comment>();
  article = input.required<Article>();
  delete = output<{
    commentId: number;
    slug: string;
  }>();
}
