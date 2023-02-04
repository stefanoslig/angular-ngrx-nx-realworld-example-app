import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { authActions } from './auth.actions';

export const logout$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        localStorageJwtService.removeItem();
        router.navigateByUrl('login');
      }),
    );
  },
  { functional: true, dispatch: false },
);
