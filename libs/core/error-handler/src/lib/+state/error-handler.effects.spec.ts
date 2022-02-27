import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';

import { ErrorHandlerEffects } from './error-handler.effects';
import { hot } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';

describe('NgrxErrorEffects', () => {
  let actions;
  let effects: ErrorHandlerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      providers: [ErrorHandlerEffects, DataPersistence, provideMockActions(() => actions)],
    });

    effects = TestBed.inject(ErrorHandlerEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
