import { AuthFacade, getUser } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgrxFormsFacade, setErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { SettingsService } from '../settings.service';
import * as SettingsActions from './settings.actions';
import { go } from '@angular-ngrx-nx-realworld-example-app/ngrx-router';

@Injectable()
export class SettingsEffects {
  editSettings = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.editSettings),
      withLatestFrom(this.ngrxFormsFacade.data$, this.authFacade.user$),
      map(([_, data, user]) => ({
        ...user,
        image: data.image,
        username: data.username,
        bio: data.bio,
        pass: data.pass,
        email: data.email,
      })),
      concatMap(data =>
        this.settingsService.update(data).pipe(
          mergeMap(result => [
            getUser(),
            go({
              to: { path: ['profile', result.user.username] },
            }),
          ]),
          catchError(result => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private authFacade: AuthFacade,
    private ngrxFormsFacade: NgrxFormsFacade,
  ) {}
}
