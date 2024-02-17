export interface ErrorHandlerState {
  code: number;
  message: string | undefined;
}

export const errorHandlerInitialState: ErrorHandlerState = {
  message: undefined,
  code: -1,
};
