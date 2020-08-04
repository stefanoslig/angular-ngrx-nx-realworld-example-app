import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Editor, editorFeatureKey } from './editor.reducer';

const getEditor = createFeatureSelector<Editor>(editorFeatureKey);
export const getArticle = createSelector(getEditor, (state: Editor) => state.article);

export const editorQuery = {
  getArticle,
};
