import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgrxFormsState } from './ngrx-forms.reducer';
import { ngrxFormsQuery } from './ngrx-forms.selectors';
import * as NgrxFormsActions from './ngrx-forms.actions';

@Injectable()
export class NgrxFormsFacade {
  data$ = this.store.select(ngrxFormsQuery.getData);
  structure$ = this.store.select(ngrxFormsQuery.getStructure);
  errors$ = this.store.select(ngrxFormsQuery.getErrors);
  touched$ = this.store.select(ngrxFormsQuery.getTouchedForm);

  constructor(private store: Store<NgrxFormsState>) {}

  setStructure(structure: any) {
    this.store.dispatch(NgrxFormsActions.setStructure({ structure }));
  }

  setData(data: any) {
    this.store.dispatch(NgrxFormsActions.setData({ data }));
  }

  updateData(data: any) {
    this.store.dispatch(NgrxFormsActions.updateData({ data }));
  }

  initializeForm() {
    this.store.dispatch(NgrxFormsActions.initializeForm());
  }

  initializeErrors() {
    this.store.dispatch(NgrxFormsActions.initializeErrors());
  }

  resetForm() {
    this.store.dispatch(NgrxFormsActions.resetForm());
  }
}
