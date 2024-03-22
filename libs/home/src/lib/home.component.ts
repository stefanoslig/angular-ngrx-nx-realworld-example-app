import { Component, ChangeDetectionStrategy, inject, effect, untracked } from '@angular/core';
import { ArticlesListStore, ListType, articlesListInitialState } from '@realworld/articles/data-access';
import { AsyncPipe, NgClass } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { HomeStoreService } from './home.store';
import { provideComponentStore } from '@ngrx/component-store';
import { AuthStore } from '@realworld/auth/data-access';

@Component({
  selector: 'cdt-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AsyncPipe, NgClass, TagsListComponent, ArticleListComponent],
  providers: [provideComponentStore(HomeStoreService)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly articlesListStore = inject(ArticlesListStore);
  private readonly authStore = inject(AuthStore);
  private readonly homeStore = inject(HomeStoreService);

  $listConfig = this.articlesListStore.listConfig;
  tags$ = this.homeStore.tags$;

  constructor() {
    this.articlesListStore.loadArticles(this.$listConfig);
  }

  readonly loadArticlesOnLogin = effect(() => {
    const isLoggedIn = this.authStore.loggedIn();
    untracked(() => this.getArticles(isLoggedIn));
  });

  setListTo(type: ListType = 'ALL') {
    const config = { ...articlesListInitialState.listConfig, type };
    this.articlesListStore.setListConfig(config);
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
  }
}
