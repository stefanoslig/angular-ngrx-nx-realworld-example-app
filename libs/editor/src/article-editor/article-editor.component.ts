import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import * as fromEditor from '../+state/editor.reducer';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { filter } from 'rxjs/operators/filter';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'title',
    placeholder: 'Article Title',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'description',
    placeholder: "What's this article about?",
    validator: [Validators.required]
  },
  {
    type: 'TEXTAREA',
    name: 'body',
    placeholder: 'Write your article (in markdown)',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'tagList',
    placeholder: 'Enter Tags',
    validator: []
  }
];

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch({
      type: '[ngrxForms] SET_STRUCTURE',
      payload: structure
    });
    this.data$ = this.store.select(fromNgrxForms.getData);
    this.structure$ = this.store.select(fromNgrxForms.getStructure);
    this.store.pipe(select(fromEditor.getArticle)).subscribe(article => {
      this.store.dispatch({
        type: '[ngrxForms] SET_DATA',
        payload: article
      });
    });
  }

  updateForm(changes: any) {
    this.store.dispatch({
      type: '[ngrxForms] UPDATE_DATA',
      payload: changes
    });
  }

  submit() {
    this.store.dispatch({
      type: '[editor] PUBLISH_ARTICLE'
    });
  }

  ngOnDestroy() {
    this.store.dispatch({
      type: '[ngrxForms] INITIALIZE_FORM'
    });
    this.store.dispatch({
      type: '[editor] INITIALIZE_ARTICLE'
    });
  }
}
