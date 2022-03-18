import { AuthFacade, getUser } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgrxFormsFacade, setErrors } from '@realworld/core/forms';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import * as SettingsActions from './settings.actions';
import { SettingsService } from '../settings.service';

@Injectable()
export class SettingsEffects {
  editSettings = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.editSettings),
      concatLatestFrom(() => [this.ngrxFormsFacade.data$, this.authFacade.user$]),
      map(([_, data, user]) => ({
        ...user,
        image: data.image,
        username: data.username,
        bio: data.bio,
        pass: data.pass,
        email: data.email,
      })),
      concatMap((data) =>
        this.settingsService.update(data).pipe(
          tap((result) => this.router.navigate(['profile', result.user.username])),
          map(() => getUser()),
          catchError((result) => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly settingsService: SettingsService,
    private readonly authFacade: AuthFacade,
    private readonly ngrxFormsFacade: NgrxFormsFacade,
    private readonly router: Router,
  ) {}
}
