import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Article } from '@angular-ngrx-nx-realworld-example-app/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css'],
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

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ArticleListItemComponent],
  exports: [ArticleListItemComponent],
})
export class ArticleListItemComponentModule {}
