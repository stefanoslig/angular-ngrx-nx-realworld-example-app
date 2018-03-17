import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/article';

export interface ArticleList {
	listConfig: ArticleListConfig;
	articles: Articles;
}

export interface ArticleListState {
	readonly articleList: ArticleList;
}

export type ListType = 'ALL' | 'FEED';

export interface Filters {
	tag?: string;
	author?: string;
	favorited?: string;
	limit?: number;
	offset?: number;
}

export interface ArticleListConfig {
	type: ListType;
	currentPage: number;
	filters: Filters;
}

export interface Articles {
	entities: ArticleData[];
	articlesCount: number;
	loaded: boolean;
	loading: boolean;
}
