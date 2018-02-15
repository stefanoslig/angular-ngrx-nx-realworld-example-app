import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ArticleData } from '../+state/article.interfaces';

@Component({
	selector: 'app-article-meta',
	templateUrl: './article-meta.component.html',
	styleUrls: ['./article-meta.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleMetaComponent {
	@Input() article: ArticleData;
	@Input() isAuthenticated: boolean;
}
