import { createActionGroup, emptyProps } from '@ngrx/store';

export const articleEditActions = createActionGroup({
  source: 'Article Edit',
  events: {
    'Publish Article': emptyProps(),
    'Publish Article Success': emptyProps(),
  },
});
