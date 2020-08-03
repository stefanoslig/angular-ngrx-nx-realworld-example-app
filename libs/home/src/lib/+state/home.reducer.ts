import { Action, createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.actions';
export const homeFeatureKey = 'home';

export interface HomeState {
  readonly [homeFeatureKey]: Home;
}

export interface Home {
  tags: string[];
}

export const homeInitialState: Home = {
  tags: [],
};

const reducer = createReducer(
  homeInitialState,
  on(HomeActions.loadTagsSuccess, (state, action) => ({ ...state, tags: action.tags })),
  on(HomeActions.loadTagsFail, (state, action) => ({ ...state, tags: [] })),
);

export function homeReducer(state: Home | undefined, action: Action): Home {
  return reducer(state, action);
}
