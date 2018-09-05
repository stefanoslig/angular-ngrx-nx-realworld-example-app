import { Action } from '@ngrx/store';

export enum HomeActionsType {
  LOAD_TAGS = '[home] LOAD_TAGS',
  LOAD_TAGS_SUCCESS = '[home] LOAD_TAGS_SUCCESS',
  LOAD_TAGS_FAIL = '[home] LOAD_TAGS_FAIL'
}

export class LoadTags implements Action {
  readonly type = HomeActionsType.LOAD_TAGS;
}

export class LoadTagsSuccess implements Action {
  readonly type = HomeActionsType.LOAD_TAGS_SUCCESS;
  constructor(public payload: string[]) {}
}

export class LoadTagsFail implements Action {
  readonly type = HomeActionsType.LOAD_TAGS_FAIL;
  constructor(public payload: Error) {}
}

export type HomeAction = LoadTags | LoadTagsSuccess | LoadTagsFail;
