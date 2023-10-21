import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';
import { Article } from '@realworld/core/api-types';
@Component({
  selector: 'cdt-article-list-item',
  standalone: true,
  templateUrl: './article-list-item.component.html',
  imports: [RouterModule, NgClass, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  @Input() article!: Article;
  @Output() favorite: EventEmitter<string> = new EventEmitter();
  @Output() unFavorite: EventEmitter<string> = new EventEmitter();
  @Output() navigateToArticle: EventEmitter<string> = new EventEmitter();

  toggleFavorite(article: Article) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }
}
