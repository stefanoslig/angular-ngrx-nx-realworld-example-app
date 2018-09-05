import { HomeAction, HomeActionsType } from './home.actions';

export interface Home {
  tags: string[];
}

export interface HomeState {
  readonly home: Home;
}

export const homeInitialState: Home = {
  tags: []
};

export function homeReducer(state: Home = homeInitialState, action: HomeAction): Home {
  switch (action.type) {
    case HomeActionsType.LOAD_TAGS_SUCCESS: {
      return { ...state, tags: action.payload };
    }
    case HomeActionsType.LOAD_TAGS_FAIL: {
      return { ...state, tags: [] };
    }
    default: {
      return state;
    }
  }
}
