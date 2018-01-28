import { Article } from './article.interfaces';

export const articleInitialState: Article = {
	slug: '',
	title: '',
	description: '',
	body: '',
	tagList: [],
	createdAt: '',
	updatedAt: '',
	favorited: false,
	favoritesCount: 0,
	author: {} //Profile;
};
