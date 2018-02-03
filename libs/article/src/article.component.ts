import { ArticleData, ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Field } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';
import * as fromEditor from '@angular-ngrx-nx/editor/src/+state/editor.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromArticle from './+state/article.reducer';

const structure: Field[] = [
  {
    type: 'TEXTAREA',
    name: 'comment',
    placeholder: 'Password'
  }
];

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Observable<ArticleData>;
  comments: Observable<ArticleComment[]>;
  isAuthenticated: Observable<boolean>;
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.article = this.store.select(fromArticle.getArticle);
    this.comments = this.store.select(fromArticle.getComments);
    this.isAuthenticated = this.store.select(fromAuth.getLoggedIn);
    this.store.dispatch({
      type: '[editor] SET_STRUCTURE',
      payload: structure
    });
    this.data$ = this.store.select(fromEditor.getData);
    this.structure$ = this.store.select(fromEditor.getStructure);
  }
}
