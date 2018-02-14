import { Component, OnInit, Input } from '@angular/core';
import { ArticleData } from '../+state/article.interfaces';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent {
  @Input() article: ArticleData;
  @Input() isAuthenticated: boolean;
}
