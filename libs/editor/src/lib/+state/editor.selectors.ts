import { editorFeature } from './editor.reducer';

export const { selectEditorState, selectArticle } = editorFeature;

export const editorQuery = {
  selectArticle,
};
