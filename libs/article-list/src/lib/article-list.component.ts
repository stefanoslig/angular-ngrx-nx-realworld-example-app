import { Article } from '@angular-ngrx-nx-realworld-example-app/api';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { ArticleListFacade } from './+state/article-list.facade';
import { ArticleListConfig } from './+state/article-list.reducer';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  totalPages$: Observable<number[]>;
  articles$: Observable<Article[]>;
  listConfig$: Observable<ArticleListConfig>;
  isLoading$: Observable<boolean>;

  constructor(private facade: ArticleListFacade) {}

  ngOnInit() {
    this.totalPages$ = this.facade.totalPages$;
    this.articles$ = this.facade.articles$;
    this.listConfig$ = this.facade.listConfig$;
    this.isLoading$ = this.facade.isLoading$;
  }

  favorite(slug: string) {
    this.facade.favorite(slug);
  }

  unFavorite(slug: string) {
    this.facade.unFavorite(slug);
  }

  navigateToArticle(slug: string) {
    this.facade.navigateToArticle(slug);
  }

  setPage(page: number) {
    this.facade.setPage(page);
  }
}
