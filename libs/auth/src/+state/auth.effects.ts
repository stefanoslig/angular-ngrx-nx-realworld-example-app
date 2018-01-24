import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {of} from 'rxjs/observable/of';
import {map} from 'rxjs/operators/map';
import {tap} from 'rxjs/operators/tap';
import {withLatestFrom} from 'rxjs/operators/withLatestFrom';
import {filter} from 'rxjs/operators/filter';
import {switchMap} from 'rxjs/operators/switchMap';
import {catchError} from 'rxjs/operators/catchError';
import 'rxjs/add/operator/switchMap';
import {AuthState} from './auth.interfaces';
import {GetUser, SetUser} from './auth.actions';
import { AuthAction } from './auth.actions';
import { LocalStorageJwtService } from '../local-storage-jwt.service';
import { ApiService } from '../../../api/src/api.service';
import { User } from './auth.interfaces';
import { authInitialState } from './auth.init';

@Injectable()
export class AuthEffects {
  @Effect() getUser = this.actions
  .ofType<GetUser>('GET_USER')
  .pipe(
    withLatestFrom(this.localStorageJwtService.getItem()),
    filter(([_, token]) => !!token),
    switchMap(item => this.apiService.get('/user')
      .pipe(
        map((data: any) => ({
          type: 'SET_USER',
          payload: data.user
        })),
        catchError(error => of({
          type: 'SET_USER',
          payload: ''
        })
      )))
  );

  @Effect() setUser = this.actions
  .ofType<SetUser>('SET_USER')
  .pipe(
    tap(action => this.localStorageJwtService.setItem(action.payload.token))
  );

  constructor(
    private actions: Actions,
    private localStorageJwtService: LocalStorageJwtService,
    private apiService: ApiService
  ) {}
}