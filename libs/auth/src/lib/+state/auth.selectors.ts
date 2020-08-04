import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth, authFeatureKey } from './auth.reducer';

export const getAuth = createFeatureSelector<Auth>(authFeatureKey);
export const getLoggedIn = createSelector(getAuth, (auth: Auth) => auth.loggedIn);
export const getUser = createSelector(getAuth, (auth: Auth) => auth.user);

export const authQuery = {
  getAuth,
  getLoggedIn,
  getUser,
};
