import { signalStore, withState } from '@ngrx/signals';
import { withCallState } from '@realworld/core/data-access';
import { ProfileState, profileInitialState } from './+state/profile.reducer';

export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState<ProfileState>(profileInitialState),
  withCallState(),
);
