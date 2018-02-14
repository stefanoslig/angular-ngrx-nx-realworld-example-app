import { NgrxFormsState, Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(private store: Store<NgrxFormsState>) {}

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
      type: '[ngrxForms] SET_DATA',
      payload: changes
    });
  }

  submit() {
    this.store.dispatch({
      type: '[auth] LOGIN'
    });
  }
}
