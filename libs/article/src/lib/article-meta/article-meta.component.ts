import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Article } from '@angular-ngrx-nx-realworld-example-app/api';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleMetaComponent {
  @Input() article: Article;
  @Input() isAuthenticated: boolean;
  @Input() canModify: boolean;
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
