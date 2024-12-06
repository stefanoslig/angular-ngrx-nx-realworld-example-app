import { TestBed } from '@angular/core/testing';
import { profileArticlesResolver } from './profile-articles-resolver';
import { cold } from 'jasmine-marbles';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const mockRoute: ActivatedRouteSnapshot = { params: { username: 'stef' } } as unknown as ActivatedRouteSnapshot;

describe('profileArticlesResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    store = TestBed.inject(MockStore);
  });

  it('should return `true` and dispatch articleListActions.setListConfig action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const result = TestBed.runInInjectionContext(
      () => profileArticlesResolver(mockRoute, {} as RouterStateSnapshot) as any,
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      articleListActions.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            author: 'stef',
          },
        },
      }),
    );
    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });
});
