import { Editor, EditorState } from './editor.interfaces';
import { EditorAction, EditorActionsType } from './editor.actions';
import { editorInitialState } from './editor.init';

export function editorReducer(state: Editor, action: EditorAction): Editor {
	switch (action.type) {
		case EditorActionsType.LOAD_ARTICLE_SUCCESS: {
			return { ...state, article: action.payload };
		}
		case EditorActionsType.LOAD_ARTICLE_FAIL:
		case EditorActionsType.INITIALIZE_ARTICLE: {
			return editorInitialState;
		}
		default: {
			return state;
		}
	}
}

export const getArticle = (state: EditorState) => state.editor.article;
