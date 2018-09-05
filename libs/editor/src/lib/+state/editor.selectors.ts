import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorState, Editor } from './editor.reducer';

const getEditor = createFeatureSelector<Editor>('editor');
export const getArticle = createSelector(getEditor, (state: Editor) => state.article);

export const editorQuery = {
  getArticle
};
