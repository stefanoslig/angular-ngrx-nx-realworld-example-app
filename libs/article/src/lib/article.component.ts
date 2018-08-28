import { ArticleData, ArticleComment } from '@angular-ngrx-nx-realworld-example-app/api';
import { User } from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromAuth from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Field } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, combineLatest } from 'rxjs/operators';

import { ArticleFacade } from './+state/article.facade';

const structure: Field[] = [
  {
    type: 'TEXTAREA',
    name: 'comment',
    placeholder: 'Write a comment...',
    attrs: {
      rows: 3
    }
  }
];

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$: Observable<ArticleData>;
  comments$: Observable<ArticleComment[]>;
  canModify = false;
  isAuthenticated$: Observable<boolean>;
  structure$: Observable<Field[]>;
  data$: Observable<any>;
  unsubscribe$ = new Subject<void>();
  currentUser$: Observable<User>;
  touchedForm$: Observable<boolean>;

  constructor(private store: Store<any>, private facade: ArticleFacade) {}

  ngOnInit() {
    this.article$ = this.facade.article$;
    this.comments$ = this.facade.comments$;
    this.isAuthenticated$ = this.store.select(fromAuth.getLoggedIn);
    this.currentUser$ = this.store.select(fromAuth.getUser);
    this.data$ = this.store.select(fromNgrxForms.getData);
    this.structure$ = this.store.select(fromNgrxForms.getStructure);
    this.touchedForm$ = this.store.select(fromNgrxForms.getTouchedForm);

    this.store.dispatch({ type: '[ngrxForms] SET_STRUCTURE', payload: structure });
    this.store.dispatch({ type: '[ngrxForms] SET_DATA', payload: '' });
    this.store
      .pipe(select(fromAuth.getAuth))
      .pipe(filter(auth => auth.loggedIn), combineLatest(this.facade.authorUsername$), takeUntil(this.unsubscribe$))
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
    this.store.dispatch({ type: '[ngrxForms] UPDATE_DATA', payload: changes });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.facade.initializeArticle();
  }
}
