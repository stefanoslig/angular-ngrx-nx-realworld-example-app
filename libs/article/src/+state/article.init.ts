import { Article } from './article.interfaces';

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
