import { Errors, NgrxFormsState } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromNgrxForms from '../+state/ngrx-forms.reducer';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors: string[];
  unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<NgrxFormsState>) {}

  ngOnInit() {
    this.store.select(fromNgrxForms.getErrors).subscribe(e => {
      this.errors = Object.keys(e || {}).map(key => `${key} ${e[key]}`);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch({
      type: '[ngrxForms] INITIALIZE_ERRORS'
    });
  }
}
