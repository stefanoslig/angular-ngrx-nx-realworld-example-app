import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const homeActions = createActionGroup({
  source: 'Home',
  events: {
    'Load Tags': emptyProps(),
    'Load Tags Failure': props<{ error: Error }>(),
    'Load Tags Success': props<{ tags: string[] }>(),
  },
});
