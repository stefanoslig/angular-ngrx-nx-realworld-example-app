import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { profileResolver } from './profile-resolver';
import { cold } from 'jasmine-marbles';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { profileActions } from '../+state/profile.actions';

const mockRoute: ActivatedRouteSnapshot = { params: { username: 'stef' } } as unknown as ActivatedRouteSnapshot;

describe('profileResolver', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });

    store = TestBed.inject(MockStore);
  });

  it('should return `true` and dispatch profileActions.loadProfile action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const result = TestBed.runInInjectionContext(() => profileResolver(mockRoute, {} as RouterStateSnapshot) as any);
    expect(dispatchSpy).toHaveBeenCalledWith(profileActions.loadProfile({ id: 'stef' }));
    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });
});
