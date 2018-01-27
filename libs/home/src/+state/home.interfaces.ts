export type ListType = 'ALL' | 'FEED';

export interface ArticleListConfig {
	type: ListType;

	filters: {
		tag?: string;
		author?: string;
		favorited?: string;
		limit?: number;
		offset?: number;
	};
}

export interface Home {
	listConfig: ArticleListConfig;
}

export interface HomeState {
	readonly home: Home;
}
