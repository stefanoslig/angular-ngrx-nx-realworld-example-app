import { createFeature, createReducer, on } from '@ngrx/store';
import { homeActions } from './home.actions';
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
    on(homeActions.loadTagsSuccess, (state, action) => ({ ...state, tags: action.tags })),
    on(homeActions.loadTagsFailure, (state) => ({ ...state, tags: [] })),
  ),
});
