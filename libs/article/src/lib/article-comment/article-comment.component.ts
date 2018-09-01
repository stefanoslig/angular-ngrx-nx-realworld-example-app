import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { ArticleComment, ArticleData, User } from '@angular-ngrx-nx-realworld-example-app/api';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentComponent {
  @Input() currentUser: User;
  @Input() comment: ArticleComment;
  @Input() article: ArticleData;
  @Output() delete: EventEmitter<{ commentId: number; slug: string }> = new EventEmitter();
}
