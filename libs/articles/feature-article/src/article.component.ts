import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, input, signal } from '@angular/core';
import { ArticleStore } from '@realworld/articles/data-access';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';
import { CommentSkeletonComponent, IconComponent, readingTimeMinutes } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [
    ArticleMetaComponent,
    ArticleCommentComponent,
    MarkdownPipe,
    AddCommentComponent,
    RouterLink,
    CommentSkeletonComponent,
    IconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug = input<string>('');

  private readonly authStore = inject(AuthStore);
  private readonly articleStore = inject(ArticleStore);

  $article = this.articleStore.data;
  $comments = this.articleStore.comments;
  $commentsLoading = this.articleStore.getCommentsLoading;

  $authorUsername = this.articleStore.data.author.username;
  $isAuthenticated = this.authStore.loggedIn;
  $currentUser = this.authStore.user;
  $canModify = computed(() => this.authStore.user.username() === this.$authorUsername());

  $readingTime = computed(() => readingTimeMinutes(this.$article.body()));

  shareTooltip = signal<string | null>(null);
  private shareTimer: ReturnType<typeof setTimeout> | null = null;

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
    this.articleStore.favouriteArticle(slug);
  }
  unfavorite(slug: string) {
    this.articleStore.unFavouriteArticle(slug);
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
    if (this.shareTimer) {
      clearTimeout(this.shareTimer);
      this.shareTimer = null;
    }
    this.articleStore.initializeArticle();
  }

  onRailFavorite() {
    const article = this.$article();
    if (article.favorited) {
      this.unfavorite(article.slug);
    } else {
      this.favorite(article.slug);
    }
  }

  onRailComment() {
    const el = document.getElementById('comments-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async onRailShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.shareTooltip.set('Link copied');
    } catch {
      this.shareTooltip.set('Copy failed');
    }
    if (this.shareTimer) {
      clearTimeout(this.shareTimer);
    }
    this.shareTimer = setTimeout(() => {
      this.shareTooltip.set(null);
      this.shareTimer = null;
    }, 2000);
  }
}
