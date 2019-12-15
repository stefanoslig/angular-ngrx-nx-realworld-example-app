import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { SettingsService } from '../settings.service';
import { SettingsEffects } from './settings.effects';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgrxFormsFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';

describe('SettingsEffects', () => {
  let actions;
  let effects: SettingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        SettingsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        SettingsService,
        ApiService,
        AuthFacade,
        NgrxFormsFacade,
      ],
    });

    effects = TestBed.inject(SettingsEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
