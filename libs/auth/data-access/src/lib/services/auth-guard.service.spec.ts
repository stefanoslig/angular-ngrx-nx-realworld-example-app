import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardService } from './auth-guard.service';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { Component } from '@angular/core';
import { of } from 'rxjs';

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

  it('should return false if the user state is not logged in', (done) => {
    jest.spyOn(storage, 'getItem').mockReturnValueOnce(of(null));

    guard.canActivate().subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should return true if the user state is logged in', (done) => {
    jest.spyOn(storage, 'getItem').mockReturnValueOnce(of('token'));

    guard.canActivate().subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
  });
});
