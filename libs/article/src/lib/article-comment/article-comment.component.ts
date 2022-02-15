import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, NgModule } from '@angular/core';
import { Article, User } from '@angular-ngrx-nx-realworld-example-app/api';
import { Comment } from '../article.interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ArticleCommentComponent],
  exports: [ArticleCommentComponent],
})
export class ArticleCommentComponentModule {}
