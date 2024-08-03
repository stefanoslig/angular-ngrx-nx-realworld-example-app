import { TestBed } from '@angular/core/testing';
import { profileFavoritesResolver } from './profile-favorites-resolver';
import { cold } from 'jasmine-marbles';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const mockRoute: ActivatedRouteSnapshot = {
  parent: { params: { username: 'stef' } },
} as unknown as ActivatedRouteSnapshot;

describe('profileFavoritesResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
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
