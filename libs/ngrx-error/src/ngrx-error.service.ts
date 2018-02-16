import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs/observable/of";
import { NgrxError } from "./+state/ngrx-error.interfaces";
import { Store } from "@ngrx/store";

@Injectable()
export class NgrxErrorHandler implements ErrorHandler {

	constructor(private store: Store<NgrxError>) { }

	handleError(error) {
		if (error instanceof HttpErrorResponse) {
			switch (error.status) {
				case 401:
					this.store.dispatch({
						type: '[ngrx-error] THROW_401_ERROR',
						payload: error
					});
					break;
			}
		}
		throw error;
	}
}