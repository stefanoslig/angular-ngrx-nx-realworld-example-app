import { Settings } from './settings.interfaces';
import { SettingsAction } from './settings.actions';

export function settingsReducer(state: Settings, action: SettingsAction): Settings {
	switch (action.type) {
		default: {
			return state;
		}
	}
}
