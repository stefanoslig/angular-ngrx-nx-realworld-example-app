import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SetData, UpdateData } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.actions';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class NgrxFormsEffects {
  @Effect()
  setData = this.actions.ofType<SetData | UpdateData>('[ngrxForms] SET_DATA', '[ngrxForms] UPDATE_DATA').pipe(
    map(action => ({
      type: '[ngrxForms] INITIALIZE_ERRORS'
    }))
  );

  constructor(private actions: Actions) {}
}
