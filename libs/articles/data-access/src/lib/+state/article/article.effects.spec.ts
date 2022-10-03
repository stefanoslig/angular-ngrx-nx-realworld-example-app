import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { ArticlesService } from '../../services/articles.service';
import { ArticleEffects } from './article.effects';
import { NgrxFormsFacade } from '@realworld/core/forms';
import { hot, cold } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsService } from '../../services/actions.service';
import { Observable, of } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { articleActions } from './article.actions';
import { Article } from '@realworld/core/api-types';

const mockArticle: Article = {
  slug: 'Create-a-new-implementation-1',
  title: 'Create a new implementation',
  description: 'join the community by creating a new implementation',
  body: 'Share your knowledge and enpower the community by creating a new implementation',
  tagList: ['implementations'],
  createdAt: '2021-11-24T12:11:08.212Z',
  updatedAt: '2021-11-24T12:11:08.212Z',
  favorited: false,
  favoritesCount: 4071,
  author: {
    username: 'Stef',
    bio: '',
    image: 'https://api.realworld.io/images/demo-avatar.png',
    following: false,
    loading: false,
  },
};

describe('ArticleEffects', () => {
  let actions$: Observable<Action>;
  let effects: ArticleEffects;
  let articlesService: ArticlesService;

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
    articlesService = TestBed.inject(ArticlesService);
  });

  describe('loadArticle$', () => {
    it('should return a loadArticleSuccess action when we dispatch the getArticle request is succesful', () => {
      const loadArticleAction = articleActions.loadArticle({ slug: 'Create-a-new-implementation-1' });
      const loadArticleSuccessAction = articleActions.loadArticleSuccess({
        article: mockArticle,
      });

      actions$ = hot('-a', { a: loadArticleAction });
      const expected = cold('-b', { b: loadArticleSuccessAction });
      articlesService.getArticle = jest.fn(() => of({ article: mockArticle }));

      expect(effects.loadArticle$).toBeObservable(expected);
    });

    it('should return a loadArticleFailure action if the getArticle request throws an error', () => {
      const error = {
        name: 'error',
        message: 'error message ',
      };
      const loadArticleAction = articleActions.loadArticle({ slug: 'Create-a-new-implementation-1' });
      const loadArticleFailureAction = articleActions.loadArticleFailure({
        error,
      });

      actions$ = hot('-a---', { a: loadArticleAction });
      const response = cold('-#', {}, { error });
      articlesService.getArticle = jest.fn(() => response);
      const expected = cold('--b', { b: loadArticleFailureAction });

      expect(effects.loadArticle$).toBeObservable(expected);
    });
  });
});
