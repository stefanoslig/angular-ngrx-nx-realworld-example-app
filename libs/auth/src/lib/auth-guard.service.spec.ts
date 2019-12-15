import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';

import { AuthGuardService } from './auth-guard.service';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-comp',
  template: '',
})
class TestComponent {}

describe('AuthGuardService', () => {
  let storage: LocalStorageJwtService;
  let guard: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: TestComponent,
          },
        ]),
      ],
      providers: [LocalStorageJwtService, AuthGuardService],
    });
    storage = TestBed.inject(LocalStorageJwtService);
    guard = TestBed.inject(AuthGuardService);
  });

  it('should return false if the user state is not logged in', () => {
    const expected = cold('(a|)', { a: false });

    (expect(guard.canActivate()) as any).toBeObservable(expected);
  });

  it('should return true if the user state is logged in', () => {
    storage.setItem('token');
    const expected = cold('(a|)', { a: true });

    (expect(guard.canActivate()) as any).toBeObservable(expected);
  });
});
