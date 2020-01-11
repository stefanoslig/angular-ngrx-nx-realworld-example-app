import { createAction, props } from '@ngrx/store';

export const loadTags = createAction('[home] LOAD_TAGS');
export const loadTagsSuccess = createAction('[home] LOAD_TAGS_SUCCESS', props<{ tags: string[] }>());
export const loadTagsFail = createAction('[home] LOAD_TAGS_FAIL', props<{ error: Error }>());
