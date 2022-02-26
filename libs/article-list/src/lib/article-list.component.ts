import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListFacade } from './+state/article-list.facade';
import { ArticleListItemComponentModule } from './article-list-item/article-list-item.component';
import { PagerComponentModule } from '@realworld/ui/components';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  totalPages$ = this.facade.totalPages$;
  articles$ = this.facade.articles$;
  listConfig$ = this.facade.listConfig$;
  isLoading$ = this.facade.isLoading$;

  constructor(private readonly facade: ArticleListFacade, private readonly router: Router) {}

  favorite(slug: string) {
    this.facade.favorite(slug);
  }

  unFavorite(slug: string) {
    this.facade.unFavorite(slug);
  }

  navigateToArticle(slug: string) {
    this.router.navigate(['/article', slug]);
  }

  setPage(page: number) {
    this.facade.setPage(page);
  }
}

@NgModule({
  imports: [CommonModule, PagerComponentModule, ArticleListItemComponentModule],
  declarations: [ArticleListComponent],
  exports: [ArticleListComponent],
})
export class ArticleListComponentModule {}
