import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { EditorService } from '../editor.service';
import { EditorEffects } from './editor.effects';
import { NgrxFormsFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';

describe('EditorEffects', () => {
  let actions;
  let effects: EditorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        EditorEffects,
        DataPersistence,
        provideMockActions(() => actions),
        EditorService,
        ApiService,
        NgrxFormsFacade,
      ],
    });

    effects = TestBed.inject(EditorEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
