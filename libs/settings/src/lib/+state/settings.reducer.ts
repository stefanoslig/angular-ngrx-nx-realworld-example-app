import { SettingsAction } from './settings.actions';

export interface SettingsState {
  readonly settings: {};
}

export function settingsReducer(state: {}, action: SettingsAction): {} {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
