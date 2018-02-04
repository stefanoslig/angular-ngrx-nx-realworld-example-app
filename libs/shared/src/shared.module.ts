import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
	imports: [CommonModule],
	declarations: [ArticleListComponent, PagerComponent],
	exports: [ArticleListComponent, PagerComponent]
})
export class SharedModule { }
