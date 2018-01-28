import { Editor, EditorState } from './editor.interfaces';
import { EditorAction } from './editor.actions';

export function editorReducer(state: Editor, action: EditorAction): Editor {
  switch (action.type) {
    case '[editor] SET_DATA': {
      return { ...state, data: action.payload };
    }
    case '[editor] SET_STRUCTURE': {
      return { ...state, structure: action.payload };
    }
    case '[editor] SAVE_DATA': {
      return { ...state, data: action.payload, status: 'IN_PROGRESS' };
    }
    case '[editor] SAVE_DATA_SUCCESS': {
      return { ...state, status: 'INIT' };
    }
    case '[editor] SAVE_DATA_FAIL': {
      return { ...state, status: 'INIT' };
    }
    default: {
      return state;
    }
  }
}

export const getStructure = (state: EditorState) => state.editor.structure;
export const getdata = (state: EditorState) => state.editor.data;
export const getStatus = (state: EditorState) => state.editor.status;
export const isValid = (state: EditorState) => state.editor.valid;
