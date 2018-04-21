import * as fromAuth from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromActions from '@angular-ngrx-nx-realworld-example-app/auth';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/core';
import { Field } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

const structure: Field[] = [
	{
		type: 'INPUT',
		name: 'image',
		placeholder: 'URL of profile picture',
		validator: []
	},
	{
		type: 'INPUT',
		name: 'username',
		placeholder: 'Your Name',
		validator: [Validators.required]
	},
	{
		type: 'TEXTAREA',
		name: 'bio',
		placeholder: 'Short bio about you',
		validator: []
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
		placeholder: 'New Password',
		validator: [Validators.required],
		attrs: {
			type: 'password'
		}
	}
];

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
	structure$: Observable<Field[]>;
	data$: Observable<any>;

	constructor(private store: Store<any>, private localStorageSevice: LocalStorageJwtService, private router: Router) { }

	ngOnInit() {
		this.store.dispatch({
			type: '[ngrxForms] SET_STRUCTURE',
			payload: structure
		});
		this.store.select(fromAuth.getUser).subscribe(user => {
			this.store.dispatch({
				type: '[ngrxForms] SET_DATA',
				payload: user
			});
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
		this.store.dispatch({
			type: '[settings] EDIT_SETTINGS'
		});
	}

	logout() {
		this.store.dispatch(new fromActions.Logout());
	}
}
