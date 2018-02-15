import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

@Component({
	selector: 'app-article-comment',
	templateUrl: './article-comment.component.html',
	styleUrls: ['./article-comment.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentComponent {
	@Input() comment: ArticleComment;
}
