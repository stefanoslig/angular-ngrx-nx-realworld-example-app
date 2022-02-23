import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EditorEffects } from './+state/editor.effects';
import { EditorFacade } from './+state/editor.facade';
import { editorFeature } from './+state/editor.reducer';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { EditorResolverService } from './editor-resolver.service';

@NgModule({
  imports: [
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
    StoreModule.forFeature(editorFeature),
    EffectsModule.forFeature([EditorEffects]),
  ],
  providers: [EditorResolverService, EditorFacade],
})
export class EditorModule {}
