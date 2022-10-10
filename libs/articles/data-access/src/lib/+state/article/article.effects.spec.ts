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
import { Article, Comment } from '@realworld/core/api-types';
import { Router } from '@angular/router';

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

const mockComments: Array<Comment> = [
  {
    id: 5,
    createdAt: '2021-11-24T12:11:08.480Z',
    body: 'If someone else has started working on an implementation, consider jumping in and helping them! by contacting the author.',
    author: {
      username: 'Gerome',
      bio: '',
      image: 'https://api.realworld.io/images/demo-avatar.png',
      following: false,
      loading: false,
    },
  },
  {
    id: 4,
    createdAt: '2021-11-24T12:11:08.340Z',
    body: 'Before starting a new implementation, please check if there is any work in progress for the stack you want to work on.',
    author: {
      username: 'Gerome',
      bio: '',
      image: 'https://api.realworld.io/images/demo-avatar.png',
      following: false,
      loading: false,
    },
  },
];

describe('ArticleEffects', () => {
  let actions$: Observable<Action>;
  let effects: ArticleEffects;
  let articlesService: ArticlesService;
  let router: Router;

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
    router = TestBed.inject(Router);
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

  describe('loadComments$', () => {
    it('should return a loadComments action when we dispatch the getComments request is succesful', () => {
      const loadCommentsAction = articleActions.loadComments({ slug: 'Create-a-new-implementation-1' });
      const loadCommentsSuccessAction = articleActions.loadCommentsSuccess({
        comments: mockComments,
      });

      actions$ = hot('-a', { a: loadCommentsAction });
      const expected = cold('-b', { b: loadCommentsSuccessAction });
      articlesService.getComments = jest.fn(() => of({ comments: mockComments }));

      expect(effects.loadComments$).toBeObservable(expected);
    });

    it('should return a loadCommentsFailure action if the getComments request throws an error', () => {
      const error = {
        name: 'error',
        message: 'error message ',
      };
      const loadCommentsAction = articleActions.loadComments({ slug: 'Create-a-new-implementation-1' });
      const loadCommentsfailureAction = articleActions.loadCommentsFailure({
        error,
      });

      actions$ = hot('-a---', { a: loadCommentsAction });
      const response = cold('-#', {}, { error });
      articlesService.getComments = jest.fn(() => response);
      const expected = cold('--b', { b: loadCommentsfailureAction });

      expect(effects.loadComments$).toBeObservable(expected);
    });
  });

  describe('deleteArticle$', () => {
    it('should return a deleteArticleSuccess action when delete an article succesfully', () => {
      const deleteArticleAction = articleActions.deleteArticle({ slug: 'Create-a-new-implementation-1' });
      const deleteArticleSuccessAction = articleActions.deleteArticleSuccess();

      actions$ = hot('-a', { a: deleteArticleAction });
      const expected = cold('-b', { b: deleteArticleSuccessAction });
      articlesService.deleteArticle = jest.fn(() => of({} as unknown as void));

      expect(effects.deleteArticle$).toBeObservable(expected);
    });

    xit('should navigate to the home page when an article is deleted', (done) => {
      const deleteArticleSuccessAction = articleActions.deleteArticleSuccess();
      const navigateSpy = jest.spyOn(router, 'navigate');

      actions$ = hot('-a', { a: deleteArticleSuccessAction });

      effects.deleteArticleSuccess$.subscribe(() => {
        expect(navigateSpy).toHaveBeenCalledWith(['']);
        done();
      });
    });

    it('should return a deleteArticleFailure action if the delete article request fails', () => {
      const error = {
        name: 'error',
        message: 'error message ',
      };
      const deleteArticleAction = articleActions.deleteArticle({ slug: 'Create-a-new-implementation-1' });
      const deleteArticleFailureAction = articleActions.deleteArticleFailure({
        error,
      });

      actions$ = hot('-a---', { a: deleteArticleAction });
      const response = cold('-#', {}, { error });
      articlesService.deleteArticle = jest.fn(() => response);
      const expected = cold('--b', { b: deleteArticleFailureAction });

      expect(effects.deleteArticle$).toBeObservable(expected);
    });
  });

  describe('deleteComment$', () => {
    it('should return a deleteCommentSuccess action when delete a comment succesfully', () => {
      const deleteCommentAction = articleActions.deleteComment({ commentId: 5, slug: 'Create-a-new-implementation-1' });
      const deleteCommentSuccessAction = articleActions.deleteCommentSuccess({ commentId: 5 });

      actions$ = hot('-a', { a: deleteCommentAction });
      const expected = cold('-b', { b: deleteCommentSuccessAction });
      articlesService.deleteComment = jest.fn(() => of({} as unknown as void));

      expect(effects.deleteComment$).toBeObservable(expected);
    });

    it('should return a deleteCommentFailure action if the delete comment request fails', () => {
      const error = {
        name: 'error',
        message: 'error message ',
      };
      const deleteCommentAction = articleActions.deleteComment({ commentId: 5, slug: 'Create-a-new-implementation-1' });
      const deleteCommentFailureAction = articleActions.deleteCommentFailure({
        error,
      });

      actions$ = hot('-a---', { a: deleteCommentAction });
      const response = cold('-#', {}, { error });
      articlesService.deleteComment = jest.fn(() => response);
      const expected = cold('--b', { b: deleteCommentFailureAction });

      expect(effects.deleteComment$).toBeObservable(expected);
    });
  });
});
