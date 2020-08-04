import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgrxFormsModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EditorEffects } from './+state/editor.effects';
import { EditorFacade } from './+state/editor.facade';
import { editorReducer, editorInitialState, editorFeatureKey } from './+state/editor.reducer';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { EditorResolverService } from './editor-resolver.service';
import { EditorService } from './editor.service';

@NgModule({
  imports: [
    CommonModule,
    NgrxFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditorComponent,
        resolve: { EditorResolverService },
        canActivate: [AuthGuardService],
      },
      {
        path: ':slug',
        component: ArticleEditorComponent,
        resolve: { EditorResolverService },
      },
    ]),
    StoreModule.forFeature(editorFeatureKey, editorReducer, {
      initialState: editorInitialState,
    }),
    EffectsModule.forFeature([EditorEffects]),
  ],
  declarations: [ArticleEditorComponent],
  providers: [EditorEffects, EditorService, EditorResolverService, EditorFacade],
})
export class EditorModule {}
