import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { ArticlesService } from '../../services/articles.service';
import { ArticleEffects } from './article.effects';
import { NgrxFormsFacade } from '@realworld/core/forms';
import { hot } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsService } from '../../services/actions.service';
import { Observable } from 'rxjs';
import { MockProvider } from 'ng-mocks';

describe('ArticleEffects', () => {
  let actions$: Observable<Action>;
  let effects: ArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        ArticleEffects,
        provideMockActions(() => actions$),
        MockProvider(ArticlesService),
        MockProvider(ActionsService),
        NgrxFormsFacade,
      ],
    });

    effects = TestBed.inject(ArticleEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions$ = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
