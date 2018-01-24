import {Home} from './home.interfaces';
import {HomeAction} from './home.actions';
import { homeInitialState } from '../+state/home.init';

export function homeReducer(state: Home = homeInitialState, action: HomeAction): Home {
  switch (action.type) {
    case 'SET_LIST_CONFIG': {
      return {...state, listConfig: action.payload};
    }
    default: {
      return state;
    }
  }
}
