import { Field, formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { articleActions, articleQuery, articlesActions } from '@realworld/articles/data-access';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { AsyncPipe } from '@angular/common';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';

const structure: Field[] = [
  {
    type: 'TEXTAREA',
    name: 'comment',
    placeholder: 'Write a comment...',
    attrs: {
      rows: 3,
    },
  },
];

@Component({
  selector: 'cdt-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [AsyncPipe, ArticleMetaComponent, ArticleCommentComponent, MarkdownPipe, AddCommentComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);

  article$ = this.store.select(articleQuery.selectData);
  comments$ = this.store.select(articleQuery.selectComments);
  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);
  touchedForm$ = this.store.select(ngrxFormsQuery.selectTouched);

  $authorUsername = this.store.selectSignal(articleQuery.getAuthorUsername);
  $isAuthenticated = this.authStore.loggedIn;
  $currentUser = this.authStore.user;
  $canModify = computed(() => this.authStore.user.username() === this.$authorUsername());

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }));
    this.store.dispatch(formsActions.setData({ data: '' }));
  }

  follow(username: string) {
    this.store.dispatch(articleActions.follow({ username }));
  }
  unfollow(username: string) {
    this.store.dispatch(articleActions.unfollow({ username }));
  }
  favorite(slug: string) {
    this.store.dispatch(articlesActions.favorite({ slug }));
  }
  unfavorite(slug: string) {
    this.store.dispatch(articlesActions.unfavorite({ slug }));
  }
  delete(slug: string) {
    this.store.dispatch(articleActions.deleteArticle({ slug }));
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.store.dispatch(articleActions.deleteComment(data));
  }
  submit(slug: string) {
    this.store.dispatch(articleActions.addComment({ slug }));
  }
  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({ data: changes }));
  }

  ngOnDestroy() {
    this.store.dispatch(articleActions.initializeArticle());
  }
}
