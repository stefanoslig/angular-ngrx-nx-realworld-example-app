import { Editor } from './editor.interfaces';

export const editorInitialState: Editor = {
	// fill it initial state here
	article: {
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
			following: false
		}
	}
};
