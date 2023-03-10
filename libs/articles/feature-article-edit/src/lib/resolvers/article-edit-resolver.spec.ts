import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { articleEditResolver } from './article-edit-resolver';
import { cold } from 'jasmine-marbles';
import { articleActions } from '@realworld/articles/data-access';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const mockRoute: ActivatedRouteSnapshot = { params: { slug: '1' } } as unknown as ActivatedRouteSnapshot;

describe('articleEditResolver', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });

    store = TestBed.inject(MockStore);
  });

  it('should return `true` and dispatch articleActions.loadArticle action when slug is not undefined', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const result = TestBed.runInInjectionContext(
      () => articleEditResolver(mockRoute, {} as RouterStateSnapshot) as any,
    );
    expect(dispatchSpy).toHaveBeenCalledWith(articleActions.loadArticle({ slug: '1' }));
    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });

  it('should just return `true` when slug is undefined', () => {
    const result = TestBed.runInInjectionContext(
      () => articleEditResolver(mockRoute, {} as RouterStateSnapshot) as any,
    );
    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });
});
