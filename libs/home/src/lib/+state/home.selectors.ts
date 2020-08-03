import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Home, homeFeatureKey } from './home.reducer';

export const getHome = createFeatureSelector<Home>(homeFeatureKey);
export const getTags = createSelector(getHome, (state: Home) => state.tags);

export const homeQuery = {
  getTags,
  getHome,
};
