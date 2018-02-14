import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleReducer } from './+state/article.reducer';
import { articleInitialState } from './+state/article.init';
import { ArticleEffects } from './+state/article.effects';
import { ArticleComponent } from './article.component';
import { ArticleResolverService } from '@angular-ngrx-nx/article/src/article-resolver.service';
import { RouterModule } from '@angular/router';
import { ArticleService } from '@angular-ngrx-nx/article/src/article.service';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { NgrxFormsModule } from '@angular-ngrx-nx/ngrx-forms';
import { MarkdownPipe } from './markdown.pipe';
import { CoreModule } from '@angular-ngrx-nx/core';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([{ path: '', component: ArticleComponent, resolve: { ArticleResolverService } }]),
    StoreModule.forFeature('article', articleReducer, { initialState: articleInitialState }),
    EffectsModule.forFeature([ArticleEffects]),
    NgrxFormsModule
  ],
  providers: [ArticleEffects, ArticleService, ArticleResolverService],
  declarations: [ArticleComponent, ArticleMetaComponent, ArticleCommentComponent, MarkdownPipe]
})
export class ArticleModule {}
