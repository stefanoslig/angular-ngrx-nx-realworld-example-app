import { ArticleData } from "@angular-ngrx-nx/article/src/+state/article.interfaces";

// tslint:disable-next-line
export interface Editor {
	article: ArticleData
}

export interface EditorState {
	readonly editor: Editor;
}
