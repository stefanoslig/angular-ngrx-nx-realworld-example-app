import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HomeService } from './home.service';

export interface HomeState {
  tags: string[];
}

export const HomeStore = signalStore(
  { providedIn: 'root' },
  withState<HomeState>({ tags: [] }),
  withMethods((store, homeService = inject(HomeService)) => ({
    getTags: rxMethod<void>(
      pipe(
        switchMap(() =>
          homeService.getTags().pipe(
            tapResponse(
              (response) => {
                patchState(store, { tags: response.tags });
              },
              (error) => {
                console.error('error getting tags: ', error);
              },
            ),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit({ getTags }) {
      getTags();
    },
  }),
);
