import { Component, OnInit } from '@angular/core';
import { Field, EditorState } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromEditor from '@angular-ngrx-nx/editor/src/+state/editor.reducer';

const structure: Field[] = [
	{
		type: 'INPUT',
		name: 'email',
		placeholder: 'Username',
		validator: [Validators.required]
	}
];

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	structure$: Observable<Field[]>
	data$: Observable<any>

	constructor(private store: Store<EditorState>) { }

	ngOnInit() {
		this.store.dispatch({
			type: '[editor] SET_STRUCTURE',
			payload: structure
		})
		this.data$ = this.store.select(fromEditor.getdata);
		this.structure$ = this.store.select(fromEditor.getStructure);
	}
}