import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer } from './+state/home.reducer';
import { homeInitialState } from './+state/home.init';
import { HomeEffects } from './+state/home.effects';

@NgModule({
  imports: [CommonModule, 
        RouterModule.forChild([ 
        /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */ 
       ]), StoreModule.forFeature('home', homeReducer, {initialState: homeInitialState}), EffectsModule.forFeature([HomeEffects]) ],
  declarations: [HomeComponent],
  providers: [HomeEffects]
})
export class HomeModule {
}
