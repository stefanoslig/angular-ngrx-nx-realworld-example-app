import { ApiService } from '@realworld/core/http-client';
import { ActionsService } from '@realworld/articles/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';

import { ArticleListService } from '../article-list.service';
import { ArticleListEffects } from './article-list.effects';
import { ArticleListFacade } from './article-list.facade';
import { hot } from 'jasmine-marbles';

describe('ArticleListEffects', () => {
  let actions;
  let effects: ArticleListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        ArticleListEffects,
        DataPersistence,
        provideMockActions(() => actions),
        ActionsService,
        ArticleListService,
        ApiService,
        ArticleListFacade,
      ],
    });

    effects = TestBed.inject(ArticleListEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
