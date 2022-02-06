import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Article, User } from '@realworld/core/api-types';
import { Comment } from '../article.interfaces';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() currentUser: User;
  @Input() comment: Comment;
  @Input() article: Article;
  @Output() delete: EventEmitter<{
    commentId: number;
    slug: string;
  }> = new EventEmitter();
}
