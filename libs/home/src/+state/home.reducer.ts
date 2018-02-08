import { homeInitialState } from '../+state/home.init';
import { HomeAction } from './home.actions';
import { Home, HomeState } from './home.interfaces';

export function homeReducer(state: Home = homeInitialState, action: HomeAction): Home {
  switch (action.type) {
    case '[home] LOAD_TAGS_SUCCESS': {
      return { ...state, tags: action.payload };
    }
    case '[home] LOAD_TAGS_FAIL': {
      return { ...state, tags: [] };
    }
    default: {
      return state;
    }
  }
}

export const getTags = (state: HomeState) => state.home.tags;
export const getHome = (state: HomeState) => state.home;
