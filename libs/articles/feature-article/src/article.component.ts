import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, input } from '@angular/core';
import { ArticleStore, ArticlesListStore } from '@realworld/articles/data-access';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';

@Component({
  selector: 'cdt-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [ArticleMetaComponent, ArticleCommentComponent, MarkdownPipe, AddCommentComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug = input<string>('');

  private readonly authStore = inject(AuthStore);
  private readonly articleStore = inject(ArticleStore);
  private readonly articlesListStore = inject(ArticlesListStore);

  $article = this.articleStore.data;
  $comments = this.articleStore.comments;

  $authorUsername = this.articleStore.data.author.username;
  $isAuthenticated = this.authStore.loggedIn;
  $currentUser = this.authStore.user;
  $canModify = computed(() => this.authStore.user.username() === this.$authorUsername());

  ngOnInit() {
    this.articleStore.getArticle(this.slug());
    this.articleStore.getComments(this.slug());
  }

  follow(username: string) {
    this.articleStore.followUser(username);
  }
  unfollow(username: string) {
    this.articleStore.unfollowUser(username);
  }
  favorite(slug: string) {
    this.articlesListStore.favouriteArticle(slug);
  }
  unfavorite(slug: string) {
    this.articlesListStore.unFavouriteArticle(slug);
  }
  delete(slug: string) {
    this.articleStore.deleteArticle(slug);
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.articleStore.deleteComment(data);
  }
  submit(comment: string) {
    this.articleStore.addComment(comment);
  }
  ngOnDestroy() {
    this.articleStore.initializeArticle();
  }
}
