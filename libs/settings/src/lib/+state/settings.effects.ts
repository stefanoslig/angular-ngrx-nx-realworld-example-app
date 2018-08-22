import * as fromAuth from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromActions from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { SettingsService } from '../settings.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { EditSettings } from './settings.actions';

@Injectable()
export class SettingsEffects {
  @Effect()
  editSettings = this.actions.ofType<EditSettings>('[settings] EDIT_SETTINGS').pipe(
    withLatestFrom(this.store.select(fromNgrxForms.getData), this.store.select(fromAuth.getUser)),
    map(([_, data, user]) => ({
      ...user,
      image: data.image,
      username: data.username,
      bio: data.bio,
      pass: data.pass,
      email: data.email
    })),
    concatMap(data =>
      this.settingsService.update(data).pipe(
        mergeMap(result => [
          new fromActions.GetUser(),
          { type: '[router] Go', payload: { path: ['profile', result.username] } }
        ]),
        catchError(result =>
          of({
            type: '[ngrxForms] SET_ERRORS',
            payload: result.error.errors
          })
        )
      )
    )
  );

  constructor(private actions: Actions, private store: Store<any>, private settingsService: SettingsService) {}
}
