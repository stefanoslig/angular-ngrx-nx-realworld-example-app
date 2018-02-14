import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { editorReducer } from './+state/editor.reducer';
import { editorInitialState } from './+state/editor.init';
import { EditorEffects } from './+state/editor.effects';
import { NgrxFormsModule } from '@angular-ngrx-nx/ngrx-forms';
import { EditorService } from '@angular-ngrx-nx/editor/src/editor.service';
import { EditorResolverService } from '@angular-ngrx-nx/editor/src/editor-resolver.service';
import { CoreModule } from '@angular-ngrx-nx/core';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgrxFormsModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ArticleEditorComponent }]),
    StoreModule.forFeature('editor', editorReducer, { initialState: editorInitialState }),
    EffectsModule.forFeature([EditorEffects])
  ],
  declarations: [ArticleEditorComponent],
  providers: [EditorEffects, EditorService, EditorResolverService]
})
export class EditorModule {}
