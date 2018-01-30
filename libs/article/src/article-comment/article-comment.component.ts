import { Component, OnInit, Input } from '@angular/core';
import { ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent {
  @Input() comment: ArticleComment;
}
