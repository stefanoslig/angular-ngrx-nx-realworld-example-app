import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { editorReducer } from './+state/editor.reducer';
import { editorInitialState } from './+state/editor.init';
import { EditorEffects } from './+state/editor.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StoreModule.forFeature('editor', editorReducer, { initialState: editorInitialState }),
    EffectsModule.forFeature([EditorEffects])
  ],
  declarations: [ArticleEditorComponent],
  providers: [EditorEffects]
})
export class EditorModule {}
