//import { Profile } from './profile.model';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

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

export interface Home {
	listConfig: ArticleListConfig;
	articles: Articles;
	tags: string[];
}

export interface HomeState {
	readonly home: Home;
}

export interface Articles {
	entities: ArticleData[];
	articlesCount: number;
	loaded: boolean;
	loading: boolean;
}
