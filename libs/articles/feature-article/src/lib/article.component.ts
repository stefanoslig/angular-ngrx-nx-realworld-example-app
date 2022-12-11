import { Field, formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { articleActions, articleQuery, articlesActions } from '@realworld/articles/data-access';
import { selectAuthState, selectLoggedIn, selectUser } from '@realworld/auth/data-access';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { CommonModule } from '@angular/common';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { Store } from '@ngrx/store';

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

@UntilDestroy()
@Component({
  selector: 'cdt-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [CommonModule, ArticleMetaComponent, ArticleCommentComponent, MarkdownPipe, AddCommentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$ = this.store.select(articleQuery.selectData);
  comments$ = this.store.select(articleQuery.selectComments);
  canModify = false;
  isAuthenticated$ = this.store.select(selectLoggedIn);
  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);
  currentUser$ = this.store.select(selectUser);
  touchedForm$ = this.store.select(ngrxFormsQuery.selectTouched);

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }));
    this.store.dispatch(formsActions.setData({ data: '' }));
    this.store
      .select(selectAuthState)
      .pipe(
        filter((auth) => auth.loggedIn),
        (auth$) => combineLatest([auth$, this.store.select(articleQuery.getAuthorUsername)]),
        untilDestroyed(this),
      )
      .subscribe(([auth, username]) => {
        this.canModify = auth.user.username === username;
      });
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
