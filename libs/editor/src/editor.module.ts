import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { editorReducer } from './+state/editor.reducer';
import { editorInitialState } from './+state/editor.init';
import { EditorEffects } from './+state/editor.effects';
import { NgrxFormsModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { EditorService } from './editor.service';
import { EditorResolverService } from './editor-resolver.service';
import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';

@NgModule({
	imports: [
		CommonModule,
		NgrxFormsModule,
		RouterModule.forChild([
			{ path: '', pathMatch: 'full', component: ArticleEditorComponent, resolve: { EditorResolverService } },
			{ path: ':slug', component: ArticleEditorComponent, resolve: { EditorResolverService } }
		]),
		StoreModule.forFeature('editor', editorReducer, { initialState: editorInitialState }),
		EffectsModule.forFeature([EditorEffects])
	],
	declarations: [ArticleEditorComponent],
	providers: [EditorEffects, EditorService, EditorResolverService]
})
export class EditorModule { }
