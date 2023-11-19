import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  articleListInitialState,
  articleListQuery,
  articleListActions,
  ListType,
} from '@realworld/articles/data-access';
import { selectLoggedIn } from '@realworld/auth/data-access';
import { AsyncPipe, NgClass} from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { HomeStoreService } from './home.store';
import { provideComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cdt-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AsyncPipe, NgClass, TagsListComponent, ArticleListComponent],
  providers: [provideComponentStore(HomeStoreService)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly homeStore = inject(HomeStoreService);
  private readonly destroyRef = inject(DestroyRef);

  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  tags$ = this.homeStore.tags$;

  ngOnInit() {
    this.store
      .select(selectLoggedIn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoggedIn) => this.getArticles(isLoggedIn));
  }

  setListTo(type: ListType = 'ALL') {
    this.store.dispatch(articleListActions.setListConfig({ config: { ...articleListInitialState.listConfig, type } }));
  }

  getArticles(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.store.dispatch(
      articleListActions.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            tag,
          },
        },
      }),
    );
  }
}
