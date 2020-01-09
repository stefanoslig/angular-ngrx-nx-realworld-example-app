import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api/src/lib/types';
import { createAction, props } from '@ngrx/store';

export const publishArticle = createAction('[editor] PUBLISH_ARTICLE');
export const initializeArticle = createAction('[editor] INITIALIZE_ARTICLE');
export const loadArticle = createAction('[editor] LOAD_ARTICLE', props<{ id: string }>());
export const loadArticleSuccess = createAction('[editor] LOAD_ARTICLE_SUCCESS', props<{ article: ArticleData }>());
export const loadArticleFail = createAction('[editor] LOAD_ARTICLE_FAIL', props<{ error: Error }>());
