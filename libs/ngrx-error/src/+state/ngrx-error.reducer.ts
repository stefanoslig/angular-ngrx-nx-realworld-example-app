import { NgrxError } from './ngrx-error.interfaces';
import { NgrxErrorAction } from './ngrx-error.actions';

export function ngrxErrorReducer(state: NgrxError, action: NgrxErrorAction): NgrxError {
	switch (action.type) {
		case '[ngrx-error] THROW_401_ERROR': {
			return { code: action.payload.status, message: action.payload.message };
		}
		case '[ngrx-error] THROW_404_ERROR': {
			return { code: action.payload.status, message: action.payload.message };
		}
		default: {
			return state;
		}
	}
}
