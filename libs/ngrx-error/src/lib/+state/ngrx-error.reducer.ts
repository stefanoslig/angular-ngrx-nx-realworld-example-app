import { NgrxErrorAction, NgrxErrorActionTypes } from './ngrx-error.actions';

export interface NgrxError {
  code: number;
  message?: string;
}

export interface NgrxErrorState {
  readonly ngrxError: NgrxError;
}

export const ngrxErrorInitialState: NgrxError = {
  code: -1
};

export function ngrxErrorReducer(state: NgrxError, action: NgrxErrorAction): NgrxError {
  switch (action.type) {
    case NgrxErrorActionTypes.THROW_401_ERROR: {
      return { code: action.payload.status, message: action.payload.message };
    }
    case NgrxErrorActionTypes.THROW_404_ERROR: {
      return { code: action.payload.status, message: action.payload.message };
    }
    default: {
      return state;
    }
  }
}
