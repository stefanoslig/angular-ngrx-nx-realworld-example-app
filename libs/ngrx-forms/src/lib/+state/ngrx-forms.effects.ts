import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SetData, UpdateData, NgrxFormsActionTypes } from './ngrx-forms.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class NgrxFormsEffects {
  @Effect()
  setData = this.actions
    .ofType<SetData | UpdateData>(NgrxFormsActionTypes.SET_DATA, NgrxFormsActionTypes.UPDATE_DATA)
    .pipe(
      map(action => ({
        type: NgrxFormsActionTypes.INITIALIZE_ERRORS
      }))
    );

  constructor(private actions: Actions) {}
}
