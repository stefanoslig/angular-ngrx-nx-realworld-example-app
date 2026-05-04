import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';
import { Article } from '@realworld/core/api-types';
import { AvatarComponent, Icon, IconComponent } from '@realworld/ui/components';
@Component({
  selector: 'cdt-article-list-item',
  templateUrl: './article-list-item.component.html',
  imports: [RouterModule, NgClass, DatePipe, AvatarComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  protected readonly Icon = Icon;
  article = input.required<Article>();
  favorite = output<string>();
  unFavorite = output<string>();
  navigateToArticle = output<string>();

  toggleFavorite(article: Article) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }
}
