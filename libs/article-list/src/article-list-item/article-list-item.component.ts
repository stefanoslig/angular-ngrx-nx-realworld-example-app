import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

@Component({
	selector: 'article-list-item',
	templateUrl: './article-list-item.component.html',
	styleUrls: ['./article-list-item.component.css']
})
export class ArticleListItemComponent {
	@Input() article: ArticleData;
	@Output() favorite: EventEmitter<string> = new EventEmitter();
	@Output() unFavorite: EventEmitter<string> = new EventEmitter();
	@Output() navigateToArticle: EventEmitter<string> = new EventEmitter();

	toggleFavorite(article: ArticleData) {
		if (article.favorited) {
			this.unFavorite.emit(article.slug);
		} else {
			this.favorite.emit(article.slug);
		}
	}
}
