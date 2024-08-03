import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export interface Errors {
  [key: string]: string;
}

export const FormErrorsStore = signalStore(
  { providedIn: 'root' },
  withState<{ _errors: Errors }>({
    _errors: {},
  }),
  withComputed(({ _errors }) => ({
    errors: computed(() => Object.keys(_errors() || {}).map((key) => `${key} ${_errors()[key]}`)),
  })),
  withMethods((store) => ({
    setErrors(errors: Errors): void {
      patchState(store, { _errors: errors });
    },
  })),
);
