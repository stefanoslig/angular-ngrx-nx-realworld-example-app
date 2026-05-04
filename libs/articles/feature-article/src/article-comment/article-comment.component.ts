import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Article, User } from '@realworld/core/api-types';
import { Comment } from '@realworld/articles/data-access';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AvatarComponent, Icon, IconComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article-comment',
  templateUrl: './article-comment.component.html',
  imports: [DatePipe, RouterModule, AvatarComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  protected readonly Icon = Icon;
  currentUser = input.required<User>();
  comment = input.required<Comment>();
  article = input.required<Article>();
  delete = output<{
    commentId: number;
    slug: string;
  }>();
}
