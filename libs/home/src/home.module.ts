import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer } from './+state/home.reducer';
import { homeInitialState } from './+state/home.init';
import { HomeEffects } from './+state/home.effects';
import { HomeResolverService } from './home-resolver.service';

@NgModule({
  imports: [CommonModule, 
        RouterModule.forChild([ 
         {path: '', pathMatch: 'full', component: HomeComponent, resolve: { HomeResolverService }}
       ]), StoreModule.forFeature('home', homeReducer, {initialState: homeInitialState}), EffectsModule.forFeature([HomeEffects]) ],
  declarations: [HomeComponent],
  providers: [HomeEffects, HomeResolverService] 
})
export class HomeModule {
}
