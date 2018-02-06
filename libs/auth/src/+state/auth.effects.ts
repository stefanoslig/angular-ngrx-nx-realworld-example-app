import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { AuthService } from '@angular-ngrx-nx/auth/src/auth.service';
import { NgrxFormsState } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { switchMap } from 'rxjs/operators/switchMap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { LocalStorageJwtService } from '../local-storage-jwt.service';
import { GetUser, Login, Register } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  getUser = this.actions.ofType<GetUser>('[auth] GET_USER').pipe(
    withLatestFrom(this.localStorageJwtService.getItem()),
    filter(([_, token]) => !!token),
    switchMap(item =>
      this.apiService.get('/user').pipe(
        map((data: any) => ({
          type: '[auth] SET_USER',
          payload: data.user
        })),
        catchError(error =>
          of({
            type: '[auth] SET_USER',
            payload: ''
          })
        )
      )
    )
  );

  //TODO: ERROR HANDLERS
  //TODO: Generic Error handler for 401 errors (should be navigated to home page automatically)
  @Effect()
  login = this.actions.ofType<Login>('[auth] LOGIN').pipe(
    withLatestFrom(this.store.select(fromNgrxForms.getData)),
    switchMap(([action, data]) =>
      this.authService.authUser('LOGIN', data).pipe(
        mergeMap(result => {
          this.localStorageJwtService.setItem(result.user.token);
          return [{ type: '[auth] LOGIN_SUCCESS' }, { type: '[Router] Go', payload: { path: ['/'] } }];
        })
      )
    )
  );

  @Effect()
  register = this.actions.ofType<Register>('[auth] REGISTER').pipe(
    withLatestFrom(this.store.select(fromNgrxForms.getData)),
    switchMap(([action, data]) =>
      this.authService.authUser('REGISTER', data).pipe(
        mergeMap(result => {
          this.localStorageJwtService.setItem(result.user.token); //TODO: Add an action instead of direct access of localStorage
          return [{ type: '[auth] REGISTER_SUCCESS' }, { type: '[Router] Go', payload: { path: ['/'] } }];
        })
      )
    )
  );

  constructor(
    private actions: Actions,
    private localStorageJwtService: LocalStorageJwtService,
    private apiService: ApiService,
    private store: Store<NgrxFormsState>,
    private authService: AuthService
  ) {}
}
