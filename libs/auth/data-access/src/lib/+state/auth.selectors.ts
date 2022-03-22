import { authFeature } from './auth.reducer';

export const { selectAuthState, selectLoggedIn, selectStatus, selectUser } = authFeature;

export const authQuery = {
  selectAuthState,
  selectLoggedIn,
  selectStatus,
  selectUser,
};
