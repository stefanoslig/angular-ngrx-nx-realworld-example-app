import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleReducer } from './+state/article.reducer';
import { articleInitialState } from './+state/article.init';
import { ArticleEffects } from './+state/article.effects';
import { ArticleComponent } from './article.component';
import { ArticleGuardService } from './article-guard.service';
import { RouterModule } from '@angular/router';
import { ArticleService } from './article.service';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { NgrxFormsModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { MarkdownPipe } from './markdown.pipe';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { SharedModule } from '@angular-ngrx-nx-realworld-example-app/shared';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: ArticleComponent, canActivate: [ArticleGuardService] }]),
		StoreModule.forFeature('article', articleReducer, { initialState: articleInitialState }),
		EffectsModule.forFeature([ArticleEffects]),
		NgrxFormsModule,
		SharedModule
	],
	providers: [ArticleEffects, ArticleService, ArticleGuardService],
	declarations: [ArticleComponent, ArticleMetaComponent, ArticleCommentComponent, MarkdownPipe, AddCommentComponent]
})
export class ArticleModule { }
