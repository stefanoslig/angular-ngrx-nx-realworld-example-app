import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
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
  withProps(() => ({
    _actionsService: inject(ActionsService),
    _profileService: inject(ProfileService),
  })),
  withMethods((store) => ({
    followUser: rxMethod<string>(
      pipe(
        switchMap((username) => store._actionsService.followUser(username)),
        tap(({ profile }) => patchState(store, profile)),
      ),
    ),
    unfollowUser: rxMethod<string>(
      pipe(
        switchMap((username) => store._actionsService.unfollowUser(username)),
        tap(({ profile }) => patchState(store, profile)),
      ),
    ),
    getProfile: rxMethod<string>(
      pipe(
        switchMap((username) =>
          store._profileService.getProfile(username).pipe(
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
