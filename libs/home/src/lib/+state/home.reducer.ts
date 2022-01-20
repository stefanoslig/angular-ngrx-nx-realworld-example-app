import { createFeature, createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.actions';
export const homeFeatureKey = 'home';

export interface HomeState {
  tags: string[];
}

export const homeInitialState: HomeState = {
  tags: [],
};

export const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer(
    homeInitialState,
    on(HomeActions.loadTagsSuccess, (state, action) => ({ ...state, tags: action.tags })),
    on(HomeActions.loadTagsFail, (state) => ({ ...state, tags: [] })),
  ),
});
