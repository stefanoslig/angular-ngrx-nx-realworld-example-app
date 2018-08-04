

import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { GetProfile } from '../+state/profile.actions';
import { ProfileService } from '../profile.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';

import { Follow, UnFollow } from './profile.actions';

@Injectable()
export class ProfileEffects {
	@Effect()
	getProfile = this.actions.ofType<GetProfile>('[profile] GET_PROFILE').pipe(
		groupBy(action => action.payload),
		mergeMap(group =>
			group.pipe(
				map(action => action.payload),
				switchMap(username =>
					this.profileService.getProfile(username).pipe(
						map(results => ({
							type: '[profile] GET_PROFILE_SUCCESS',
							payload: results
						})),
						catchError(error =>
							of({
								type: '[profile] GET_PROFILE_FAIL',
								payload: error
							})
						)
					)
				)
			)
		)
	);

	@Effect()
	follow = this.actions.ofType<Follow>('[profile] FOLLOW').pipe(
		map(action => action.payload),
		concatMap(slug =>
			this.actionsService.followUser(slug).pipe(
				map(results => ({
					type: '[profile] FOLLOW_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[profile] FOLLOW_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	unFollow = this.actions.ofType<UnFollow>('[profile] UNFOLLOW').pipe(
		map(action => action.payload),
		concatMap(slug =>
			this.actionsService.unfollowUser(slug).pipe(
				map(results => ({
					type: '[profile] UNFOLLOW_SUCCESS',
					payload: results
				})),
				catchError(error =>
					of({
						type: '[profile] UNFOLLOW_FAIL',
						payload: error
					})
				)
			)
		)
	);

	constructor(
		private actions: Actions,
		private actionsService: ActionsService,
		private profileService: ProfileService
	) { }
}
