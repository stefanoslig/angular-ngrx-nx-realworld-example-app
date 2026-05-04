import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ArticlesListStore, ListType, articlesListInitialState } from '@realworld/articles/data-access';
import { NgClass } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { Icon, IconComponent } from '@realworld/ui/components';
import { HomeStore } from './home.store';

@Component({
  selector: 'cdt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgClass, TagsListComponent, ArticleListComponent, IconComponent],
  providers: [HomeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly articlesListStore = inject(ArticlesListStore);
  private readonly homeStore = inject(HomeStore);

  $listConfig = this.articlesListStore.listConfig;
  $tags = this.homeStore.tags;

  protected readonly Icon = Icon;

  constructor() {
    this.setListTo('ALL');
  }

  setListTo(type: ListType = 'ALL') {
    const config = { ...articlesListInitialState.listConfig, type };
    this.articlesListStore.setListConfig(config);
    this.articlesListStore.loadArticles(this.$listConfig());
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
}
