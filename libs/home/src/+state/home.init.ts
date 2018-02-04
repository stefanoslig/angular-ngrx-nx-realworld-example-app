import { Home } from './home.interfaces';

export const homeInitialState: Home = {
	listConfig: {
		type: 'ALL',
		currentPage: 1,
		filters: {
			limit: 10
		}
	},
	articles: {
		entities: [],
		articlesCount: 0,
		loaded: false,
		loading: false
	},
	tags: []
};
