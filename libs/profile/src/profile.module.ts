import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { profileReducer } from './+state/profile.reducer';
import { profileInitialState } from './+state/profile.init';
import { ProfileEffects } from './+state/profile.effects';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileResolverService } from './profile-resolver.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				resolve: { ProfileResolverService },
				children: [
					{
						path: '',
						component: ProfileComponent
					},
					{
						path: 'favorites',
						component: ProfileComponent
					}
				]
			}
		]),
		StoreModule.forFeature('profile', profileReducer, { initialState: profileInitialState }),
		EffectsModule.forFeature([ProfileEffects])
	],
	providers: [ProfileEffects, ProfileService, ProfileResolverService],
	declarations: [ProfileComponent]
})
export class ProfileModule { }
