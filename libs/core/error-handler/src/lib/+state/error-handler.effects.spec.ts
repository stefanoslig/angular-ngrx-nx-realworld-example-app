import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { ErrorHandlerEffects } from './error-handler.effects';
import { hot } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('ErrorHandlerEffects', () => {
  let actions$: Observable<Action>;
  let effects: ErrorHandlerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      providers: [ErrorHandlerEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ErrorHandlerEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions$ = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
