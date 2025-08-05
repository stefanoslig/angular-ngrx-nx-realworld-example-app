import { Component, ChangeDetectionStrategy, inject, effect, untracked } from '@angular/core';
import { ArticlesListStore, ListType, articlesListInitialState } from '@realworld/articles/data-access';
import { NgClass } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { SearchBarComponent } from '@realworld/ui/components';
import { HomeStore } from './home.store';

import { AuthStore } from '@realworld/auth/data-access';

@Component({
  selector: 'cdt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgClass, TagsListComponent, ArticleListComponent, SearchBarComponent],
  providers: [HomeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly articlesListStore = inject(ArticlesListStore);
  private readonly authStore = inject(AuthStore);
  private readonly homeStore = inject(HomeStore);

  $listConfig = this.articlesListStore.listConfig;
  $tags = this.homeStore.tags;

  readonly loadArticlesOnLogin = effect(() => {
    const isLoggedIn = this.authStore.loggedIn();
    untracked(() => this.getArticles(isLoggedIn));
  });

  setListTo(type: ListType = 'ALL') {
    const config = { ...articlesListInitialState.listConfig, type };
    this.articlesListStore.setListConfig(config);
    this.articlesListStore.loadArticles(this.$listConfig());
  }

  getArticles(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.articlesListStore.setListConfig({
      ...articlesListInitialState.listConfig,
      filters: {
        ...articlesListInitialState.listConfig.filters,
        tag,
      },
    });
    this.articlesListStore.loadArticles(this.$listConfig());
  }

  onSearchChange(searchTerm: string) {
    this.articlesListStore.setSearchTerm(searchTerm);
    this.articlesListStore.loadArticles(this.$listConfig());
  }
}
