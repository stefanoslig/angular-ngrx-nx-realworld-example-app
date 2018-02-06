import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';

export interface EditSettings {
  type: '[settings] EDIT_SETTINGS';
  payload: User;
}

export type SettingsAction = EditSettings;
