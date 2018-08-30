import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import * as fromArticleListActions from './+state/article-list.actions';
import { ArticleListConfig, ArticleListState } from './+state/article-list.interfaces';
import * as fromArticleList from './+state/article-list.reducer';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {
  totalPages: Array<number> = [1];
  articles$: Observable<ArticleData[]>;
  listConfig$: Observable<ArticleListConfig>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<ArticleListState>) {}

  ngOnInit() {
    this.getTotalPages();
    this.articles$ = this.store.pipe(select(fromArticleList.getArticles));
    this.listConfig$ = this.store.pipe(select(fromArticleList.getListConfig));
    this.isLoading$ = this.store.pipe(select(fromArticleList.isLoading));
  }

  favorite(slug: string) {
    this.store.dispatch(new fromArticleListActions.Favorite(slug));
  }

  unFavorite(slug: string) {
    this.store.dispatch(new fromArticleListActions.UnFavorite(slug));
  }

  navigateToArticle(slug: string) {
    this.store.dispatch({ type: '[router] Go', payload: { path: ['/article', slug] } });
  }

  getTotalPages() {
    this.store
      .select(fromArticleList.getArticlesCount)
      .pipe(withLatestFrom(this.store.select(fromArticleList.getListConfig)))
      .subscribe(([articlesCount, config]) => {
        this.totalPages = Array.from(
          new Array(Math.ceil(articlesCount / config.filters.limit)),
          (val, index) => index + 1
        );
      });
  }

  setPage(page: number) {
    this.store.dispatch(new fromArticleListActions.SetListPage(page));
  }
}
