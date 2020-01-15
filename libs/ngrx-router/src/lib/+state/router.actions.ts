import { createAction, props } from '@ngrx/store';
import { NgrxRoute } from './router.interfaces';

export const go = createAction('[router] Go', props<{ to: NgrxRoute }>());
export const back = createAction('[router] BACK');
export const forward = createAction('[router] FORWARD');
