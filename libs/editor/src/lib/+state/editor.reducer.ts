import { Article } from '@angular-ngrx-nx-realworld-example-app/api';

import { Action, createReducer, on } from '@ngrx/store';
import * as EditorActions from './editor.actions';

export const editorFeatureKey = 'editor';

export interface Editor {
  article: Article;
}

export interface EditorState {
  readonly [editorFeatureKey]: Editor;
}

export const editorInitialState: Editor = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
      loading: false,
    },
  },
};

const reducer = createReducer(
  editorInitialState,
  on(EditorActions.loadArticleSuccess, (state, action) => ({ ...state, article: action.article })),
  on(EditorActions.loadArticleFail, EditorActions.initializeArticle, () => editorInitialState),
);

export function editorReducer(state: Editor | undefined, action: Action): Editor {
  return reducer(state, action);
}
