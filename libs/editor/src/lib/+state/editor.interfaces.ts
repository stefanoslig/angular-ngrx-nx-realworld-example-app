import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';

export interface Editor {
  article: ArticleData;
}

export interface EditorState {
  readonly editor: Editor;
}
