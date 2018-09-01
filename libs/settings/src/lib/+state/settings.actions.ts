import { User } from '@angular-ngrx-nx-realworld-example-app/api';

export interface EditSettings {
  type: '[settings] EDIT_SETTINGS';
  payload: User;
}

export type SettingsAction = EditSettings;
