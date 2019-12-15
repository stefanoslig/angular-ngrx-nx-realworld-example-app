import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SetData, UpdateData, NgrxFormsActionTypes } from './ngrx-forms.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class NgrxFormsEffects {
  @Effect()
  setData = this.actions.pipe(
    ofType<SetData | UpdateData>(NgrxFormsActionTypes.SET_DATA, NgrxFormsActionTypes.UPDATE_DATA),
    map(action => ({
      type: NgrxFormsActionTypes.INITIALIZE_ERRORS,
    })),
  );

  constructor(private actions: Actions) {}
}
