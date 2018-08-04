import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { ArticleComment, ArticleData } from '../+state/article.interfaces';
import { User } from '@angular-ngrx-nx-realworld-example-app/auth';

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
