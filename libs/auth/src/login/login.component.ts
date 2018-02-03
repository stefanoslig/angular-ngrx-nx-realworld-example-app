import { EditorState, Field } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';
import * as fromEditor from '@angular-ngrx-nx/editor/src/+state/editor.reducer';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	structure$: Observable<Field[]>;
	data$: Observable<any>;

	constructor(private store: Store<EditorState>) { }

	ngOnInit() {
		this.store.dispatch({
			type: '[editor] SET_STRUCTURE',
			payload: structure
		});
		this.data$ = this.store.select(fromEditor.getData);
		this.structure$ = this.store.select(fromEditor.getStructure);
	}

	updateForm(changes: any) {
		this.store.dispatch({
			type: '[editor] SET_DATA',
			payload: changes
		});
	}

	submit() {
		this.store.dispatch({
			type: '[auth] LOGIN'
		});
	}
}
