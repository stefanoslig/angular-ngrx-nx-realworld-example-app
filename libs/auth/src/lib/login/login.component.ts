import { NgrxFormsState, Field } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from '../+state/auth.actions';

const structure: Field[] = [
	{
		type: 'INPUT',
		name: 'email',
		placeholder: 'Username',
		validator: [Validators.required]
	},
	{
		type: 'INPUT',
		name: 'password',
		placeholder: 'Password',
		validator: [Validators.required],
		attrs: {
			type: 'password'
		}
	}
];

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
	structure$: Observable<Field[]>;
	data$: Observable<any>;

	constructor(private store: Store<NgrxFormsState>) { }

	ngOnInit() {
		this.store.dispatch({
			type: '[ngrxForms] SET_STRUCTURE',
			payload: structure
		});
		this.data$ = this.store.select(fromNgrxForms.getData);
		this.structure$ = this.store.select(fromNgrxForms.getStructure);
	}

	updateForm(changes: any) {
		this.store.dispatch({
			type: '[ngrxForms] UPDATE_DATA',
			payload: changes
		});
	}

	submit() {
		this.store.dispatch(new fromActions.Login());
	}

	ngOnDestroy() {
		this.store.dispatch({
			type: '[ngrxForms] INITIALIZE_FORM'
		});
	}
}
