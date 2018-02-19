import 'rxjs/add/operator/switchMap';

import { ArticleService } from '@angular-ngrx-nx/article/src/article.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { concatMap } from 'rxjs/operators/concatMap';
import { map } from 'rxjs/operators/map';

import { LoadArticle, LoadComments, UnFollow, Follow, Favorite, UnFavorite, DeleteArticle, DeleteComment } from './article.actions';
import { ArticleState } from './article.interfaces';
import { ActionsService } from '@angular-ngrx-nx/core/src/actions.service';

@Injectable()
export class ArticleEffects {
	@Effect()
	loadArticle = this.actions.ofType<LoadArticle>('[article] LOAD_ARTICLE').pipe(
		concatMap(action =>
			this.articleService.get(action.payload).pipe(
				map(results => ({
					type: '[article] LOAD_ARTICLE_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article] LOAD_ARTICLE_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	loadComments = this.actions.ofType<LoadComments>('[article] LOAD_COMMENTS').pipe(
		concatMap(action =>
			this.articleService.getComments(action.payload).pipe(
				map(results => ({
					type: '[article] LOAD_COMMENTS_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article] LOAD_COMMENTS_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	deleteArticle = this.actions.ofType<DeleteArticle>('[article] DELETE_ARTICLE').pipe(
		concatMap(action =>
			this.articleService.deleteArticle(action.payload).pipe(
				map(_ => ({ type: '[Router] Go', payload: { path: ['/'] } })),
				catchError(error =>
					of({
						type: '[article] DELETE_ARTICLE_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	deleteComment = this.actions.ofType<DeleteComment>('[article] DELETE_COMMENT').pipe(
		map(action => action.payload),
		concatMap(data =>
			this.articleService.deleteComment(data.commentId, data.slug).pipe(
				map(_ => ({
					type: '[article] DELETE_COMMENT_SUCCESS',
					payload: data.commentId
				})),
				catchError(error =>
					of({
						type: '[article] DELETE_COMMENT_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	follow = this.actions.ofType<Follow>('[article] FOLLOW').pipe(
		map(action => action.payload),
		concatMap(slug =>
			this.actionsService.followUser(slug).pipe(
				map(results => ({
					type: '[article] FOLLOW_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article] FOLLOW_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	unFollow = this.actions.ofType<UnFollow>('[article] UNFOLLOW').pipe(
		map(action => action.payload),
		concatMap(slug =>
			this.actionsService.unfollowUser(slug).pipe(
				map(results => ({
					type: '[article] UNFOLLOW_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article] UNFOLLOW_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	favorite = this.actions.ofType<Favorite>('[article] FAVORITE').pipe(
		map(action => action.payload),
		concatMap(slug =>
			this.actionsService.favorite(slug).pipe(
				map(results => ({
					type: '[article] FAVORITE_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article] FAVORITE_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	unFavorite = this.actions.ofType<UnFavorite>('[article] UNFAVORITE').pipe(
		map(action => action.payload),
		concatMap(slug =>
			this.actionsService.unfavorite(slug).pipe(
				map(results => ({
					type: '[article] UNFAVORITE_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[article] UNFAVORITE_FAIL',
						payload: error
					})
				)
			)
		)
	);

	constructor(
		private actions: Actions,
		private dataPersistence: DataPersistence<ArticleState>,
		private articleService: ArticleService,
		private actionsService: ActionsService
	) { }
}
