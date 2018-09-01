import { Field, NgrxFormsState } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthFacade } from '../+state/auth.facade';

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

  constructor(private store: Store<NgrxFormsState>, private facade: AuthFacade) {}

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
    this.facade.login();
  }

  ngOnDestroy() {
    this.store.dispatch({
      type: '[ngrxForms] INITIALIZE_FORM'
    });
  }
}
