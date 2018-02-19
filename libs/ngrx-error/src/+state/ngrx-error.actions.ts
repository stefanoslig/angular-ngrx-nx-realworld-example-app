import { HttpErrorResponse } from '@angular/common/http';

export interface Throw401Error {
	type: '[ngrx-error] THROW_401_ERROR';
	payload: HttpErrorResponse;
}

export interface Throw404Error {
	type: '[ngrx-error] THROW_404_ERROR';
	payload: HttpErrorResponse;
}

export type NgrxErrorAction = Throw401Error | Throw404Error;
