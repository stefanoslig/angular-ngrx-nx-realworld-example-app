import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { setLoaded, withCallState } from '@realworld/core/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { ActionsService } from '@realworld/articles/data-access';
import { pipe, switchMap, tap } from 'rxjs';
import { ProfileService } from './services/profile.service';
import { ProfileState, profileInitialState } from './models/profile-state.model';
import { tapResponse } from '@ngrx/operators';

export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState<ProfileState>(profileInitialState),
  withMethods((store, actionsService = inject(ActionsService), profileService = inject(ProfileService)) => ({
    followUser: rxMethod<string>(
      pipe(
        switchMap((username) => actionsService.followUser(username)),
        tap(({ profile }) => patchState(store, profile)),
      ),
    ),
    unfollowUser: rxMethod<string>(
      pipe(
        switchMap((username) => actionsService.unfollowUser(username)),
        tap(({ profile }) => patchState(store, profile)),
      ),
    ),
    getProfile: rxMethod<string>(
      pipe(
        switchMap((username) =>
          profileService.getProfile(username).pipe(
            tapResponse({
              next: (profile) => {
                patchState(store, { ...profile, ...setLoaded('getProfile') });
              },
              error: () => {
                patchState(store, { ...profileInitialState, ...setLoaded('getProfile') });
              },
            }),
          ),
        ),
      ),
    ),
  })),
  withCallState({ collection: 'getProfile' }),
);
