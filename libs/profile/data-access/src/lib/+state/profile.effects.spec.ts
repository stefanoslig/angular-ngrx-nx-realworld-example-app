import { ActionsService } from '@realworld/articles/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';

import { ProfileService } from '../profile.service';
import { ProfileEffects } from './profile.effects';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { ApiService } from '@realworld/core/http-client';

describe('ProfileEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProfileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        ProfileService,
        MockProvider(ApiService),
        ActionsService,
      ],
    });

    effects = TestBed.inject(ProfileEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions$ = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
