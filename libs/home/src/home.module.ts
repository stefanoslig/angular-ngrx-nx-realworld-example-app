import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HomeEffects } from './+state/home.effects';
import { homeInitialState } from './+state/home.init';
import { homeReducer } from './+state/home.reducer';
import { ArticleComponent } from './article/article.component';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { ApiModule } from '@angular-ngrx-nx/api';


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', pathMatch: 'full', component: HomeComponent, resolve: { HomeResolverService } }
		]),
		StoreModule.forFeature('home', homeReducer, { initialState: homeInitialState }),
		EffectsModule.forFeature([HomeEffects]),
		ApiModule
	],
	declarations: [HomeComponent, ArticleComponent],
	providers: [HomeEffects, HomeResolverService, HomeService]
})
export class HomeModule { }
