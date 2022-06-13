import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '@realworld/core/api-types';
@Component({
  selector: 'cdt-article-meta',
  standalone: true,
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css'],
  imports: [RouterModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleMetaComponent {
  @Input() article!: Article;
  @Input() isAuthenticated!: boolean;
  @Input() canModify!: boolean;
  @Output() follow: EventEmitter<string> = new EventEmitter<string>();
  @Output() unfollow: EventEmitter<string> = new EventEmitter<string>();
  @Output() unfavorite: EventEmitter<string> = new EventEmitter();
  @Output() favorite: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  toggleFavorite() {
    if (this.article.favorited) {
      this.unfavorite.emit(this.article.slug);
    } else {
      this.favorite.emit(this.article.slug);
    }
  }

  toggleFollow() {
    if (this.article.author.following) {
      this.unfollow.emit(this.article.author.username);
    } else {
      this.follow.emit(this.article.author.username);
    }
  }

  deleteArticle() {
    this.delete.emit(this.article.slug);
  }
}
