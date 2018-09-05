import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Home } from './home.reducer';

export const getHome = createFeatureSelector<Home>('home');
export const getTags = createSelector(getHome, (state: Home) => state.tags);

export const homeQuery = {
  getTags,
  getHome
};
