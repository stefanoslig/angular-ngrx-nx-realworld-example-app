import { createFeature, createReducer, on } from '@ngrx/store';
import * as NgrxErrorActions from './ngrx-error.actions';

export interface NgrxErrorState {
  code: number;
  message: string | undefined;
}

export const ngrxErrorInitialState: NgrxErrorState = {
  message: undefined,
  code: -1,
};

export const ngrxErrorFeature = createFeature({
  name: 'ngrxError',
  reducer: createReducer(
    ngrxErrorInitialState,
    on(NgrxErrorActions.throw401Error, (state, action) => ({
      code: action.error.status,
      message: action.error.message,
    })),
    on(NgrxErrorActions.throw404Error, (state, action) => ({
      code: action.error.status,
      message: action.error.message,
    })),
  ),
});
