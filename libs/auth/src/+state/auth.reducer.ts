import {Auth} from './auth.interfaces';
import {AuthAction} from './auth.actions';

export function authReducer(state: Auth, action: AuthAction): Auth {
  switch (action.type) {
    case 'DATA_LOADED': {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}
