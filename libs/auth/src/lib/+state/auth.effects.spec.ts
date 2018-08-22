import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from '@nrwl/nx/testing';

import { AuthService } from '../auth.service';
import { AuthEffects } from './auth.effects';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthEffects', () => {
  let actions;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule, RouterTestingModule],
      providers: [AuthEffects, provideMockActions(() => actions), LocalStorageJwtService, ApiService, AuthService]
    });

    effects = TestBed.get(AuthEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
