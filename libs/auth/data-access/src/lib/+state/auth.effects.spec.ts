import { Errors, NgrxFormsFacade, setErrors } from '@realworld/core/forms';
import { ApiService } from '@realworld/core/http-client';
import { User } from '@realworld/core/api-types';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { authActions } from './auth.actions';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../services/auth.service';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { AuthEffects } from './auth.effects';
import { hot } from 'jasmine-marbles';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let service: AuthService;
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
        MockProvider(AuthService),
        {
          provide: NgrxFormsFacade,
          useValue: { data$: of({}) },
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
    router = TestBed.inject(Router);
    storage = TestBed.inject(LocalStorageJwtService);

    jest.spyOn(storage, 'setItem');
    jest.spyOn(storage, 'removeItem');
    jest.spyOn(router, 'navigateByUrl');
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
      jest.spyOn(service, 'login').mockReturnValueOnce(of({ user: result }));

      const loginAction = authActions.login();
      const loginSuccessAction = authActions.loginSuccess({ user: result });

      actions$ = hot('-a', { a: loginAction });
      const expected = cold('-b', { b: loginSuccessAction });

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a [ngrx-forms] SetErrors action if the login service throws', () => {
      const result = {
        error: {
          errors: { invalid: 'Invalid username or password' } as Errors,
        },
      };
      const loginAction = authActions.login();
      const setErrorsAction = setErrors({ errors: result.error.errors });

      actions$ = hot('-a', { a: loginAction });
      const response = cold('-#', {}, result);
      service.login = jest.fn(() => response);
      const expected = cold('--b', { b: setErrorsAction });

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
      const registerAction = authActions.register();
      const registerSuccessAction = authActions.registerSuccess({
        user: result,
      });

      actions$ = hot('-a', { a: registerAction });
      const expected = cold('-b', { b: registerSuccessAction });
      service.register = jest.fn(() => of({ user: result }));

      expect(effects.register$).toBeObservable(expected);
    });

    it('should return a [ngrx-forms] SetErrors action if the register service throws', () => {
      const result = {
        error: {
          errors: { invalid: 'Invalid data' } as Errors,
        },
      };
      const registerAction = authActions.register();
      const setErrorsAction = setErrors({ errors: result.error.errors });

      actions$ = hot('-a---', { a: registerAction });
      const response = cold('-#', {}, result);
      service.register = jest.fn(() => response);
      const expected = cold('--b', { b: setErrorsAction });

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

      const loginSuccessAction = authActions.loginSuccess({ user: result });
      actions$ = of(loginSuccessAction);

      effects.loginOrRegisterSuccess$.subscribe((a) => {
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

      const registerSuccessAction = authActions.registerSuccess({
        user: result,
      });
      actions$ = of(registerSuccessAction);

      effects.loginOrRegisterSuccess$.subscribe((a) => {
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

      const getUserAction = authActions.getUser();
      const getUserActionSuccess = authActions.getUserSuccess({ user });

      actions$ = hot('-a', { a: getUserAction });
      const expected = cold('-b', { b: getUserActionSuccess });
      service.user = jest.fn(() => of({ user }));

      expect(effects.getUser$).toBeObservable(expected);
    });

    it('should return a GetUserFail action when user call throws', () => {
      const error = new Error('error');
      const getUserAction = authActions.getUser();
      const getUserFailure = authActions.getUserFailure({ error });

      actions$ = hot('-a---', { a: getUserAction });
      const response = cold('-#', {}, error);
      service.user = jest.fn(() => response);
      const expected = cold('--b', { b: getUserFailure });

      expect(effects.getUser$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    it('should remove the access token from the local storage and navigate to the login page', () => {
      const logoutAction = authActions.logout();
      actions$ = hot('-a', { a: logoutAction });

      expect(effects.logout$).toBeObservable(actions$ as any);

      expect(getEffectsMetadata(effects).logout$?.dispatch).toBe(false);
      expect(storage.removeItem).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    });
  });
});
