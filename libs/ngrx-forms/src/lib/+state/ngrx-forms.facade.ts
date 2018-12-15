import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SetData, SetStructure, UpdateData, InitializeForm, InitializeErrors, ResetForm } from './ngrx-forms.actions';
import { NgrxFormsState } from './ngrx-forms.reducer';
import { ngrxFormsQuery } from './ngrx-forms.selectors';

@Injectable()
export class NgrxFormsFacade {
	data$ = this.store.select(ngrxFormsQuery.getData);
	structure$ = this.store.select(ngrxFormsQuery.getStructure);
	errors$ = this.store.select(ngrxFormsQuery.getErrors);
	touched$ = this.store.select(ngrxFormsQuery.getTouchedForm);

	constructor(private store: Store<NgrxFormsState>) { }

	setStructure(structure: any) {
		this.store.dispatch(new SetStructure(structure));
	}

	setData(data: any) {
		this.store.dispatch(new SetData(data));
	}

	updateData(data: any) {
		this.store.dispatch(new UpdateData(data));
	}

	initializeForm() {
		this.store.dispatch(new InitializeForm());
	}

	initializeErrors() {
		this.store.dispatch(new InitializeErrors());
	}

	resetForm() {
		this.store.dispatch(new ResetForm());
	}
}
