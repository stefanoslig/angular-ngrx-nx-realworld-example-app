import { createFeature, createReducer, on } from '@ngrx/store';
import { errorHandlerActions } from './error-handler.actions';

export interface ErrorHandlerState {
  code: number;
  message: string | undefined;
}

export const errorHandlerInitialState: ErrorHandlerState = {
  message: undefined,
  code: -1,
};

export const errorHandlerFeature = createFeature({
  name: 'errorHandler',
  reducer: createReducer(
    errorHandlerInitialState,
    on(errorHandlerActions.throw401Error, (_, action) => ({
      code: action.error.status,
      message: action.error.message,
    })),
    on(errorHandlerActions.throw404Error, (_, action) => ({
      code: action.error.status,
      message: action.error.message,
    })),
  ),
});
