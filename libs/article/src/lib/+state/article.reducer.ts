import { ArticleAction, ArticleActionTypes } from './article.actions';
import { Profile, ArticleComment, ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';

export interface Article {
  data: ArticleData;
  comments: ArticleComment[];
  loading: boolean;
  loaded: boolean;
}

export interface ArticleState {
  readonly article: Article;
}

export const articleInitialState: Article = {
  data: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
      loading: false
    }
  },
  comments: [],
  loaded: false,
  loading: false
};

export function articleReducer(state: Article = articleInitialState, action: ArticleAction): Article {
  switch (action.type) {
    case ArticleActionTypes.LOAD_ARTICLE_SUCCESS: {
      return { ...state, data: action.payload, loaded: true, loading: false };
    }
    case ArticleActionTypes.LOAD_ARTICLE_FAIL: {
      return { ...state, data: articleInitialState.data, loaded: false, loading: false };
    }
    case ArticleActionTypes.ADD_COMMENT_SUCCESS: {
      const comments: ArticleComment[] = [action.payload, ...state.comments];
      return { ...state, comments };
    }
    case ArticleActionTypes.DELETE_COMMENT_SUCCESS: {
      const comments: ArticleComment[] = state.comments.filter(item => item.id !== action.payload);
      return { ...state, comments };
    }
    case ArticleActionTypes.INITIALIZE_ARTICLE: {
      return articleInitialState;
    }
    case ArticleActionTypes.DELETE_ARTICLE_FAIL: {
      return articleInitialState;
    }
    case ArticleActionTypes.LOAD_COMMENTS_SUCCESS: {
      return { ...state, comments: action.payload };
    }
    case ArticleActionTypes.LOAD_COMMENTS_FAIL: {
      return { ...state, comments: articleInitialState.comments };
    }
    case ArticleActionTypes.FOLLOW_SUCCESS:
    case ArticleActionTypes.UNFOLLOW_SUCCESS: {
      const data: ArticleData = { ...state.data, author: action.payload };
      return { ...state, data };
    }
    case ArticleActionTypes.FAVORITE_SUCCESS:
    case ArticleActionTypes.UNFAVORITE_SUCCESS: {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}
