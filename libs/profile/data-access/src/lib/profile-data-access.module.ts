import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfileEffects } from './+state/profile.effects';
import { ProfileFacade } from './+state/profile.facade';
import { profileFeature } from './+state/profile.reducer';
import {
  ProfileArticlesResolverService,
  ProfileFavoritesResolverService,
  ProfileResolverService,
} from './profile-resolver.service';

@NgModule({
  imports: [StoreModule.forFeature(profileFeature), EffectsModule.forFeature([ProfileEffects])],
  providers: [ProfileResolverService, ProfileArticlesResolverService, ProfileFavoritesResolverService, ProfileFacade],
})
export class ProfileDataAccessModule {}
