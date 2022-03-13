import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { Field, NgrxFormsFacade } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { ArticleMetaComponentModule } from './article-meta/article-meta.component';
import { ArticleCommentComponentModule } from './article-comment/article-comment.component';
import { MarkdownPipeModule } from './markdown.pipe';
import { ArticlesFacade } from '@realworld/articles/data-access';

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
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$ = this.facade.article$;
  comments$ = this.facade.comments$;
  canModify = false;
  isAuthenticated$ = this.authFacade.isLoggedIn$;
  structure$ = this.ngrxFormsFacade.structure$;
  data$ = this.ngrxFormsFacade.data$;
  currentUser$ = this.authFacade.user$;
  touchedForm$ = this.ngrxFormsFacade.touched$;

  constructor(
    private ngrxFormsFacade: NgrxFormsFacade,
    private facade: ArticlesFacade,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit() {
    this.ngrxFormsFacade.setStructure(structure);
    this.ngrxFormsFacade.setData('');
    this.authFacade.auth$
      .pipe(
        filter((auth) => auth.loggedIn),
        (auth$) => combineLatest([auth$, this.facade.authorUsername$]),
        untilDestroyed(this),
      )
      .subscribe(([auth, username]) => {
        this.canModify = auth.user.username === username;
      });
  }

  follow(username: string) {
    this.facade.follow(username);
  }
  unfollow(username: string) {
    this.facade.unfollow(username);
  }
  favorite(slug: string) {
    this.facade.favorite(slug);
  }
  unfavorite(slug: string) {
    this.facade.unfavorite(slug);
  }
  delete(slug: string) {
    this.facade.delete(slug);
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.facade.deleteComment(data);
  }
  submit(slug: string) {
    this.facade.submit(slug);
  }
  updateForm(changes: any) {
    this.ngrxFormsFacade.updateData(changes);
  }

  ngOnDestroy() {
    this.facade.initializeArticle();
  }
}

@NgModule({
  imports: [CommonModule, ArticleMetaComponentModule, ArticleCommentComponentModule, MarkdownPipeModule],
  declarations: [ArticleComponent],
  exports: [ArticleComponent],
})
export class ArticleComponentModule {}
