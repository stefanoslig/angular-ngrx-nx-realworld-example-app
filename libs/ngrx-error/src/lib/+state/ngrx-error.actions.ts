import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum NgrxErrorActionTypes {
  THROW_401_ERROR = '[ngrx-error] THROW_401_ERROR',
  THROW_404_ERROR = '[ngrx-error] THROW_404_ERROR'
}

export class Throw401Error implements Action {
  readonly type = NgrxErrorActionTypes.THROW_401_ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export class Throw404Error implements Action {
  readonly type = NgrxErrorActionTypes.THROW_404_ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type NgrxErrorAction = Throw401Error | Throw404Error;
