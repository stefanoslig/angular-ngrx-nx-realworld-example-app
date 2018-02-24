import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { ArticleComment, ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';

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
