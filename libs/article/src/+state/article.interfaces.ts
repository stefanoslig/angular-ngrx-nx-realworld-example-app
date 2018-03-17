import { Profile } from '@angular-ngrx-nx-realworld-example-app/profile';

export interface Article {
	data: ArticleData;
	comments: ArticleComment[];
	loading: boolean;
	loaded: boolean;
}

export interface ArticleState {
	readonly article: Article;
}

export interface ArticleComment {
	id: number;
	body: string;
	createdAt: string;
	author: Profile;
}

export interface ArticleData {
	slug: string;
	title: string;
	description: string;
	body: string;
	tagList: string[];
	createdAt: string;
	updatedAt: string;
	favorited: boolean;
	favoritesCount: number;
	author: Profile;
}
