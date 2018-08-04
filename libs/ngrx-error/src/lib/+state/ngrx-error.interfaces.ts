export interface NgrxError {
  code: number;
  message?: string;
}

export interface NgrxErrorState {
  readonly ngrxError: NgrxError;
}
