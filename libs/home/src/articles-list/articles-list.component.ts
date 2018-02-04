import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

@Component({
	selector: 'articles-list',
	templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent {
	@Input() articles: ArticleData[];
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
