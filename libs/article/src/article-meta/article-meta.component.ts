import { Component, OnInit, Input } from '@angular/core';
import { Article } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

@Component({
  selector: 'article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent {
  @Input() article: Article;
  @Input() isAuthenticated: boolean;
}
