import { DatePipe, NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article } from '@realworld/core/api-types';
@Component({
  selector: 'cdt-article-meta',
  templateUrl: './article-meta.component.html',
  imports: [RouterModule, NgClass, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleMetaComponent {
  article = input.required<Article>();
  canModify = input.required<boolean>();
  follow = output<string>();
  unfollow = output<string>();
  unfavorite = output<string>();
  favorite = output<string>();
  delete = output<string>();

  toggleFavorite() {
    if (this.article().favorited) {
      this.unfavorite.emit(this.article().slug);
    } else {
      this.favorite.emit(this.article().slug);
    }
  }

  toggleFollow() {
    if (this.article().author.following) {
      this.unfollow.emit(this.article().author.username);
    } else {
      this.follow.emit(this.article().author.username);
    }
  }

  deleteArticle() {
    this.delete.emit(this.article().slug);
  }
}
