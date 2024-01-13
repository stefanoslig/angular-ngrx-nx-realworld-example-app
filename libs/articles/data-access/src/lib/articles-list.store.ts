import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ArticlesListState, articlesListInitialState } from './models/articles-list.model';
import { inject } from '@angular/core';
import { ArticlesService } from './services/articles.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, tap } from 'rxjs';
import { setLoaded, setLoading, withCallState } from '@realworld/core/data-access';
import { tapResponse } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { articleListQuery } from './+state/article-list/article-list.selectors';

export const ArticlesListStore = signalStore(
  { providedIn: 'root' },
  withState<ArticlesListState>(articlesListInitialState),
  withMethods((store, articlesService = inject(ArticlesService), reduxStore = inject(Store)) => ({
    loadArticles: rxMethod<string>(
      pipe(
        concatLatestFrom(() => reduxStore.select(articleListQuery.selectListConfig)),
        tap(() => setLoading('getArticles')),
        concatMap(([, config]) =>
          articlesService.query(config).pipe(
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
  })),
  withCallState({ collection: 'getArticles' }),
);
