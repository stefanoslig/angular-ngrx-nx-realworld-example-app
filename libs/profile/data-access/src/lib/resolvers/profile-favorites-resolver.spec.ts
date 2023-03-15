import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { profileFavoritesResolver } from './profile-favorites-resolver';
import { cold } from 'jasmine-marbles';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { articleListActions, articleListInitialState } from '@realworld/articles/data-access';

const mockRoute: ActivatedRouteSnapshot = {
  parent: { params: { username: 'stef' } },
} as unknown as ActivatedRouteSnapshot;

describe('profileFavoritesResolver', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });

    store = TestBed.inject(MockStore);
  });

  it('should return `true` and dispatch articleListActions.setListConfig action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const result = TestBed.runInInjectionContext(
      () => profileFavoritesResolver(mockRoute, {} as RouterStateSnapshot) as any,
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      articleListActions.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            favorited: 'stef',
          },
        },
      }),
    );
    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });
});
