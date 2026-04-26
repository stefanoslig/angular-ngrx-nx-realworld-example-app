import { Component, ChangeDetectionStrategy, computed, output, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';
import { Article } from '@realworld/core/api-types';
import { AvatarComponent, TagChipComponent, IconComponent, readingTimeMinutes } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article-list-item',
  templateUrl: './article-list-item.component.html',
  imports: [RouterModule, NgClass, DatePipe, AvatarComponent, TagChipComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  article = input.required<Article>();
  favorite = output<string>();
  unFavorite = output<string>();
  navigateToArticle = output<string>();

  readonly $readingTime = computed(() => readingTimeMinutes(this.article().body));

  toggleFavorite(article: Article) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }
}
