import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HomeEffects } from './+state/home.effects';
import { homeInitialState } from './+state/home.init';
import { homeReducer } from './+state/home.reducer';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { ApiModule } from '@angular-ngrx-nx/api';
import { TagsListComponent } from './tags-list/tags-list.component';
import { SharedModule } from '@angular-ngrx-nx/shared';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{ path: '', pathMatch: 'full', component: HomeComponent, resolve: { HomeResolverService } }
		]),
		StoreModule.forFeature('home', homeReducer, { initialState: homeInitialState }),
		EffectsModule.forFeature([HomeEffects]),
		ApiModule
	],
	declarations: [HomeComponent, ArticlesListComponent, TagsListComponent],
	providers: [HomeEffects, HomeResolverService, HomeService]
})
export class HomeModule { }
