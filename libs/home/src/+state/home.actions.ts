import { ArticleListConfig } from './home.interfaces';

export interface SetListConfig {
  type: 'SET_LIST_CONFIG';
  payload: ArticleListConfig;
}

export type HomeAction = SetListConfig;

