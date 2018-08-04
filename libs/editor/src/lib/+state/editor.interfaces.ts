import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/article';

// tslint:disable-next-line
export interface Editor {
  article: ArticleData;
}

export interface EditorState {
  readonly editor: Editor;
}
