import { User } from '@angular-ngrx-nx-realworld-example-app/api';
import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
  EDIT_SETTINGS = '[settings] EDIT_SETTINGS'
}

export class EditSettings implements Action {
  readonly type = SettingsActionTypes.EDIT_SETTINGS;
}

export type SettingsAction = EditSettings;
