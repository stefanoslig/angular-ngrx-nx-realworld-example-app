import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Field, NgrxFormsState } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Validators } from '@angular/forms';
import * as fromActions from '../+state/auth.actions';

const structure: Field[] = [
	{
		type: 'INPUT',
		name: 'username',
		placeholder: 'Username',
		validator: [Validators.required]
	},
	{
		type: 'INPUT',
		name: 'email',
		placeholder: 'Email',
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
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
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
		this.store.dispatch(new fromActions.Register());
	}

	ngOnDestroy() {
		this.store.dispatch({
			type: '[ngrxForms] INITIALIZE_FORM'
		});
	}
}
