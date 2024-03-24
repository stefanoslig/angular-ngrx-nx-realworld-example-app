import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsState, formsInitialState } from './forms.model';

export const FormsStore = signalStore(
  { providedIn: 'root' },
  withState<FormsState>(formsInitialState),
  withMethods((store, router = inject(Router)) => ({})),
);
