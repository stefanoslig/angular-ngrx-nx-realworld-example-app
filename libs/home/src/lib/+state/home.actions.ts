export interface LoadTags {
  type: '[home] LOAD_TAGS';
}

export interface LoadTagsSuccess {
  type: '[home] LOAD_TAGS_SUCCESS';
  payload: string[];
}

export interface LoadTagsFail {
  type: '[home] LOAD_TAGS_FAIL';
  payload: Error;
}

export type HomeAction = LoadTags | LoadTagsSuccess | LoadTagsFail;
