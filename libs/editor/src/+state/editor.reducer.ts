import { Editor } from './editor.interfaces';
import { EditorAction } from './editor.actions';

export function editorReducer(state: Editor, action: EditorAction): Editor {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
