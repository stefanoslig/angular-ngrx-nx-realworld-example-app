import { App } from './app.interfaces';
import { AppAction } from './app.actions';

export function appReducer(state: App, action: AppAction): App {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
