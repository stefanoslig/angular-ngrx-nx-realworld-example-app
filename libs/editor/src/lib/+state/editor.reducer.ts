import { Article } from '@realworld/core/api-types';

import { createFeature, createReducer, on } from '@ngrx/store';
import * as EditorActions from './editor.actions';

export interface EditorState {
  article: Article;
}

export const editorInitialState: EditorState = {
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

export const editorFeature = createFeature({
  name: 'editor',
  reducer: createReducer(
    editorInitialState,
    on(EditorActions.loadArticleSuccess, (state, action) => ({ ...state, article: action.article })),
    on(EditorActions.loadArticleFail, EditorActions.initializeArticle, () => editorInitialState),
  ),
});
