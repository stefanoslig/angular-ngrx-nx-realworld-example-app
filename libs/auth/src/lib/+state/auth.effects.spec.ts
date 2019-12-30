import { ApiService, User } from '@angular-ngrx-nx-realworld-example-app/api';
import { Errors, NgrxFormsFacade, SetErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Action } from '@ngrx/store';
import { hot } from '@nrwl/angular/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as AuthActions from './auth.actions';

import { AuthService } from '../auth.service';
import { LocalStorageJwtService } from '../local-storage-jwt.service';
import { AuthEffects } from './auth.effects';

xdescribe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let service: AuthService;
  let ngrxFormsFacade: NgrxFormsFacade;
  let router: Router;
  let storage: LocalStorageJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        LocalStorageJwtService,
        ApiService,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            user: jest.fn(),
          },
        },
        {
          provide: NgrxFormsFacade,
          useValue: { data$: jest.fn(() => cold('a', {})) },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: jest.fn() },
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(AuthService);
    ngrxFormsFacade = TestBed.inject(NgrxFormsFacade);
    router = TestBed.inject(Router);
    storage = TestBed.inject(LocalStorageJwtService);

    spyOn(storage, 'setItem').and.callThrough();
    spyOn(storage, 'removeItem').and.callThrough();
    spyOn(router, 'navigateByUrl').and.callThrough();
  });

  describe('login$', () => {
    it('should return a LoginSuccess action, with user information when login succeeds', () => {
      const result: User = {
        email: 'test@gmail.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };
      const loginAction = AuthActions.login();
      const loginSuccessAction = AuthActions.loginSuccess({ user: result });

      actions$ = hot('-a---', { a: loginAction });
      const response = cold('-a|', { a: result });
      const expected = cold('--b', { b: loginSuccessAction });
      service.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a [ngrx-forms] SetErrors action if the login service throws', () => {
      const result = {
        error: {
          errors: { invalid: 'Invalid username or password' } as Errors,
        },
      };
      const loginAction = AuthActions.login();
      const setErrors = new SetErrors(result.error.errors);

      actions$ = hot('-a---', { a: loginAction });
      const response = cold('-#', {}, result);
      service.login = jest.fn(() => response);
      const expected = cold('--b', { b: setErrors });

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('register$', () => {
    it('should return a RegisterSuccess action, with user information when register succeeds', () => {
      const result: User = {
        email: 'test@gmail.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };
      const registerAction = AuthActions.register();
      const registerSuccessAction = AuthActions.registerSuccess({
        user: result,
      });

      actions$ = hot('-a---', { a: registerAction });
      const response = cold('-a|', { a: result });
      const expected = cold('--b', { b: registerSuccessAction });
      service.register = jest.fn(() => response);

      (expect(effects.register$) as any).toBeObservable(expected);
    });

    it('should return a [ngrx-forms] SetErrors action if the register service throws', () => {
      const result = {
        error: {
          errors: { invalid: 'Invalid data' } as Errors,
        },
      };
      const registerAction = AuthActions.register();
      const setErrors = new SetErrors(result.error.errors);

      actions$ = hot('-a---', { a: registerAction });
      const response = cold('-#', {}, result);
      service.register = jest.fn(() => response);
      const expected = cold('--b', { b: setErrors });

      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('loginOrRegisterSuccess$', () => {
    it('should dispatch a RouterNavigation action when login succeeds', (done: any) => {
      const result: User = {
        email: 'test@gmail.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const loginSuccessAction = AuthActions.loginSuccess({ user: result });
      actions$ = of(loginSuccessAction);

      effects.loginOrRegisterSuccess$.subscribe(a => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        done();
      });
    });

    it('should dispatch a RouterNavigation action when register succeeds', (done: any) => {
      const result: User = {
        email: 'test@gmail.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const registerSuccessAction = AuthActions.registerSuccess({
        user: result,
      });
      actions$ = of(registerSuccessAction);

      effects.loginOrRegisterSuccess$.subscribe(a => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        expect(storage.setItem).toHaveBeenCalledWith(result.token);
        done();
      });
    });
  });

  describe('getUser$', () => {
    it('should return a GetUserSuccess action when user call succeeds', () => {
      const user: User = {
        email: 'test@gmail.com',
        token: 'token',
        username: 'test',
        bio: '',
        image: '',
      };

      const getUserAction = AuthActions.getUser();
      const getUserActionSuccess = AuthActions.getUserSuccess({ user });

      actions$ = hot('-a---', { a: getUserAction });
      const response = cold('-a|', { a: { user } });
      const expected = cold('--b', { b: getUserActionSuccess });
      service.user = jest.fn(() => response);

      expect(effects.getUser$).toBeObservable(expected);
    });

    it('should return a GetUserFail action when user call throws', () => {
      const error = new Error('error');
      const getUserAction = AuthActions.getUser();
      const getUserFail = AuthActions.getUserFail({ error });

      actions$ = hot('-a---', { a: getUserAction });
      const response = cold('-#', {}, error);
      service.user = jest.fn(() => response);
      const expected = cold('--b', { b: getUserFail });

      expect(effects.getUser$).toBeObservable(expected);
    });
  });
});
