import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth-guard';
import { cold } from 'jasmine-marbles';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'cdt-test-comp',
  template: '',
})
class TestComponent {}

describe('authGuard', () => {
  let storage: LocalStorageJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: TestComponent,
          },
        ]),
      ],
      providers: [{ provide: LocalStorageJwtService, useValue: { getItem: () => of('token') } }],
    });

    storage = TestBed.inject(LocalStorageJwtService);
  });

  it('should return true if the user is logged in', () => {
    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });

  it('should return false if the user is not logged in', () => {
    jest.spyOn(storage, 'getItem').mockImplementationOnce(() => of(null));

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBeObservable(cold('(a|)', { a: false }));
  });
});
