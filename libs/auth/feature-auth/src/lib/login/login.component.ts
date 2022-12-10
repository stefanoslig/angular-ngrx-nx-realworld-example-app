import { DynamicFormComponent, Field, formsActions, ListErrorsComponent, ngrxFormsQuery } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authActions } from '@realworld/auth/data-access';
import { Store } from '@ngrx/store';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Username',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  selector: 'cdt-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ListErrorsComponent, DynamicFormComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }));
  }

  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({ data: changes }));
  }

  submit() {
    this.store.dispatch(authActions.login());
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.initializeForm());
  }
}
