import { Article, User } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { Field, NgrxFormsFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Comment } from './article.interfaces';
import { ArticleFacade } from './+state/article.facade';

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
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$: Observable<Article>;
  comments$: Observable<Comment[]>;
  canModify = false;
  isAuthenticated$: Observable<boolean>;
  structure$: Observable<Field[]>;
  data$: Observable<any>;
  unsubscribe$ = new Subject<void>();
  currentUser$: Observable<User>;
  touchedForm$: Observable<boolean>;

  constructor(
    private ngrxFormsFacade: NgrxFormsFacade,
    private facade: ArticleFacade,
    private auhtFacade: AuthFacade,
  ) {}

  ngOnInit() {
    this.article$ = this.facade.article$;
    this.comments$ = this.facade.comments$;
    this.isAuthenticated$ = this.auhtFacade.isLoggedIn$;
    this.currentUser$ = this.auhtFacade.user$;
    this.data$ = this.ngrxFormsFacade.data$;
    this.structure$ = this.ngrxFormsFacade.structure$;
    this.touchedForm$ = this.ngrxFormsFacade.touched$;

    this.ngrxFormsFacade.setStructure(structure);
    this.ngrxFormsFacade.setData('');
    this.auhtFacade.auht$
      .pipe(
        filter(auth => auth.loggedIn),
        auth$ => combineLatest([auth$, this.facade.authorUsername$]),
        takeUntil(this.unsubscribe$),
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.facade.initializeArticle();
  }
}
