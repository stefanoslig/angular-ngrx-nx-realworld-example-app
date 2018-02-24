import { Editor, EditorState } from './editor.interfaces';
import { EditorAction } from './editor.actions';
import { editorInitialState } from '@angular-ngrx-nx/editor/src/+state/editor.init';

export function editorReducer(state: Editor, action: EditorAction): Editor {
  switch (action.type) {
    case '[editor] LOAD_ARTICLE_SUCCESS': {
      return { ...state, article: action.payload };
    }
    case '[editor] LOAD_ARTICLE_FAIL':
    case '[editor] INITIALIZE_ARTICLE': {
      return editorInitialState;
    }
    default: {
      return state;
    }
  }
}

export const getArticle = (state: EditorState) => state.editor.article;
