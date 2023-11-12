import { signalStore, withState } from '@ngrx/signals';
import { AuthState } from './auth.model';
import { withCallState } from './call-state.feature';

export const authInitialState: AuthState = {
  loggedIn: false,
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
};

export const AuthStore = signalStore(withState<AuthState>(authInitialState), withCallState());
