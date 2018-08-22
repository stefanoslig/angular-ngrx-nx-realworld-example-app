import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { HomeService } from '../home.service';
import { HomeEffects } from './home.effects';

describe('HomeEffects', () => {
  let actions;
  let effects: HomeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [HomeEffects, DataPersistence, provideMockActions(() => actions), ApiService, HomeService]
    });

    effects = TestBed.get(HomeEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
