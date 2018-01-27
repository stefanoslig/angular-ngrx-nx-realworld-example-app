import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
	imports: [CommonModule],
	declarations: [ArticleListComponent, TagListComponent, PagerComponent],
	exports: [ArticleListComponent, TagListComponent, PagerComponent]
})
export class SharedModule { }
