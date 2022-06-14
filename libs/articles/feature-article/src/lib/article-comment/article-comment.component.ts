import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Article, User } from '@realworld/core/api-types';
import { Comment } from '@realworld/articles/data-access';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cdt-article-comment',
  standalone: true,
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() currentUser!: User;
  @Input() comment!: Comment;
  @Input() article!: Article;
  @Output() delete: EventEmitter<{
    commentId: number;
    slug: string;
  }> = new EventEmitter();
}
