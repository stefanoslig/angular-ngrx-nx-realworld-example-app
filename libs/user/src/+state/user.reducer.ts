import { User } from './user.interfaces';
import { UserAction } from './user.actions';

export function userReducer(state: User, action: UserAction): User {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
