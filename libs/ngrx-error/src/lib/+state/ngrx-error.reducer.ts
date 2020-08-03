import { Action, createReducer, on } from '@ngrx/store';
import * as NgrxErrorActions from './ngrx-error.actions';

export const ngrxErrorFeatureKey = 'ngrxError';

export interface NgrxError {
  code: number;
  message?: string;
}

export interface NgrxErrorState {
  readonly [ngrxErrorFeatureKey]: NgrxError;
}

export const ngrxErrorInitialState: NgrxError = {
  code: -1,
};

const reducer = createReducer(
  ngrxErrorInitialState,
  on(NgrxErrorActions.throw401Error, (state, action) => ({ code: action.error.status, message: action.error.message })),
  on(NgrxErrorActions.throw404Error, (state, action) => ({ code: action.error.status, message: action.error.message })),
);

export function ngrxErrorReducer(state: NgrxError | undefined, action: Action): NgrxError {
  return reducer(state, action);
}
