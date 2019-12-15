import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from '@nrwl/angular/testing';

import { NgrxFormsEffects } from './ngrx-forms.effects';
import { NgrxFormsFacade } from './ngrx-forms.facade';

describe('NgrxFormsEffects', () => {
  let actions;
  let effects: NgrxFormsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgrxFormsEffects, provideMockActions(() => actions), NgrxFormsFacade],
    });

    effects = TestBed.inject(NgrxFormsEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
