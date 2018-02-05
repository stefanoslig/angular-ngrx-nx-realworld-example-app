import { Editor } from './editor.interfaces';
import { EditorAction } from './editor.actions';

export function editorReducer(state: Editor, action: EditorAction): Editor {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
