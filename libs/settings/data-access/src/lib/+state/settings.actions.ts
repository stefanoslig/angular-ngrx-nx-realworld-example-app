import { createActionGroup, emptyProps } from '@ngrx/store';

export const editSettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'Edit Settings': emptyProps(),
  },
});
