import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './+state/user.reducer';
import { userInitialState } from './+state/user.init';
import { UserEffects } from './+state/user.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StoreModule.forFeature('user', userReducer, { initialState: userInitialState }),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserEffects]
})
export class UserModule {}
