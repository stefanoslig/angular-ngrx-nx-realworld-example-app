import { HttpErrorResponse } from '@angular/common/http';

export interface ThrowError {
  type: '[ngrx-error] THROW_401_ERROR';
  payload: HttpErrorResponse;
}

export type NgrxErrorAction = ThrowError;
