import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ArticlesListConfig, ArticlesListState, articlesListInitialState } from './models/articles-list.model';
import { Signal, inject } from '@angular/core';
import { ArticlesService } from './services/articles.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, tap } from 'rxjs';
import { setLoaded, setLoading, withCallState } from '@realworld/core/data-access';
import { tapResponse } from '@ngrx/operators';

export const ArticlesListStore = signalStore(
  { providedIn: 'root' },
  withState<ArticlesListState>(articlesListInitialState),
  withMethods((store, articlesService = inject(ArticlesService)) => ({
    loadArticles: rxMethod<Signal<ArticlesListConfig>>(
      pipe(
        tap(() => setLoading('getArticles')),
        concatMap((listConfig) =>
          articlesService.query(listConfig).pipe(
            tapResponse({
              next: ({ articles }) => {
                patchState(store, {
                  articles: { articlesCount: articles.length, entities: articles },
                  ...setLoaded('getArticles'),
                });
              },
              error: () => {
                patchState(store, { ...articlesListInitialState, ...setLoaded('getArticles') });
              },
            }),
          ),
        ),
      ),
    ),
    setListTag: (listConfig: ArticlesListConfig) => {
      patchState(store, { listConfig });
    },
    setListPage: (page: number) => {
      const filters = {
        ...store.listConfig.filters(),
        offset: (store.listConfig().filters.limit ?? 10) * (page - 1),
      };
      const listConfig: ArticlesListConfig = {
        ...store.listConfig(),
        currentPage: page,
        filters,
      };
      patchState(store, { listConfig });
    },
  })),
  withCallState({ collection: 'getArticles' }),
);
